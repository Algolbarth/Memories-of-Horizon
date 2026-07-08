import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class Tenacite extends Action {
    name = "Ténacité";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Terre", 30]]);

        this.addChoice([
            `Augmente de 50 l'endurance d'une créature sur votre terrain.`,
            `Augmente de 50 la constitution et la force d'une créature sur votre terrain.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Augmente de 50 l'endurance d'une créature sur votre terrain"],
                    () => {
                        this.saveChoice("endurance");
                        this.changePanel(1);
                    }),
                new Button(["Augmente de 50 la constitution et la force d'une créature sur votre terrain"],
                    () => {
                        this.saveChoice("balance");
                        this.changePanel(1);
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect(this.currentInterface().first_choice, target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target != undefined) {
            if (target.stat("Vitalité").value() <= target.stat("Endurance").value()) {
                this.useEffect("balance", target);
            }
            else {
                this.useEffect("endurance", target);
            }
        }
    };

    useEffect = (choice: string, target: Creature) => {
        this.targeting(target);

        if (choice == "endurance") {
            target.stat("Endurance").increase(50);
        }
        else if (choice == "balance") {
            target.stat("Force").increase(50);
            target.stat("Constitution").increase(50);
        }

        this.move("Défausse");
        this.pose();
    };
};