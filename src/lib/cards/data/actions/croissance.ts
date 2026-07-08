import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Croissance extends Action {
    name = "Croissance";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Nature", 30]]);

        this.addChoice([
            `Augmente de 75 la constitution d'une créature sur votre terrain.`,
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
                new Button(["Augmente de 75 la constitution d'une créature sur votre terrain"],
                    () => {
                        this.saveChoice("life");
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
            if (target.isFamily("Plante")) {
                this.useEffect("life", target);
            }
            else {
                this.useEffect("balance", target);
            }
        }
    };

    useEffect = (choice: string, target: Creature) => {
        this.targeting(target);

        if (choice == "life") {
            target.stat("Constitution").increase(75);
        }
        else if (choice == "balance") {
            target.stat("Force").increase(50);
            target.stat("Constitution").increase(50);
        }

        this.move("Défausse");
        this.pose();
    };
};