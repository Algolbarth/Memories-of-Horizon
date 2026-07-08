import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Meteore extends Item {
    name = "Météore";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Spatial"]);

        this.addChoice([
            `Stocke 1 flux.`,
            `Inflige 40 dégâts spéciaux à une unité sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.owner().is_player || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Stocke 1 flux"],
                    () => {
                        this.useEffect("stockage");
                        this.closeInterface();
                    }),
                new Button(["Inflige 40 dégâts spéciaux à une unité sur le terrain adverse"],
                    () => {
                        this.changePanel(1);
                    })])
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect("damage", target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
        }
        else {
            this.useEffect("stockage");
        }
    };

    useEffect = (choice: string, target: Unit | undefined = undefined) => {
        if (choice == "stockage") {
            this.owner().ressource("Flux").stock(1);
        }
        else if (choice == "damage" && target != undefined) {
            this.targeting(target);

            target.specialDamage(40, this);
        }

        this.move("Défausse");
        this.pose();
    };
};