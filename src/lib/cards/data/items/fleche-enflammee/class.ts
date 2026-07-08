import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class FlecheEnflamee extends Item {
    name = "Flèche enflammée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.addChoice([
            `Augmente de 10 la brûlure d'une unité sur le terrain adverse.`,
            `Inflige 30 dégâts spéciaux à une unité sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Augmente de 1 votre production de feu"],
                    () => {
                        this.saveChoice("burn");
                        this.changePanel(1);
                    }),
                new Button(["Inflige 20 dégâts spéciaux à une unité sur le terrain adverse"],
                    () => {
                        this.saveChoice("damage");
                        this.changePanel(1);
                    })])
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(this.currentInterface().first_choice, target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
    };

    useEffect = (choice: string, target: Unit) => {
        this.targeting(target);

        if (choice == "burn") {
            target.stat("Brûlure").increase(10);
        }
        else if (choice == "damage") {
            target.specialDamage(30, this);
        }

        this.move("Défausse");
        this.pose();
    };
};