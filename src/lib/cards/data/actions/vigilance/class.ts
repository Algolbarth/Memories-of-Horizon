import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Vigilance extends Action {
    name = "Vigilance";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12]]);

        this.addChoice([
            `Augmente de 10 l'endurance d'une créature sur votre terrain.`,
            `Augmente de 10 la résistance d'une créature sur votre terrain.`]);
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
                new Button(["Augmente de 10 l'endurance d'une créature sur votre terrain"],
                    () => {
                        this.saveChoice("endurance");
                        this.changePanel(1);
                    }),
                new Button(["Augmente de 10 la résistance d'une créature sur votre terrain"],
                    () => {
                        this.saveChoice("resistance");
                        this.changePanel(1);
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect(target, this.currentInterface().first_choice);
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
            if (target.stat("Endurance").value() <= target.stat("Résistance").value()) {
                this.useEffect("endurance", target);
            }
            else {
                this.useEffect("resistance", target);
            }
        }
    };

    useEffect = (choice: string, target: Creature) => {
        this.targeting(target);

        if (choice == "endurance") {
            target.stat("Endurance").increase(10);
        }
        else if (choice == "resistance") {
            target.stat("Résistance").increase(10);
        }

        this.move("Défausse");
        this.pose();
    };
};