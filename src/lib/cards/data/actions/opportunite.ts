import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Opportunite extends Action {
    name = "Opportunité";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.addChoice([
            `Découvre 1 carte.`,
            `Augmente de 1 l'initiative d'une créature sur votre terrain pendant ce tour.`]);
    };

    userInterface = () => {
        let check: boolean = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Découvre 1 carte"],
                        () => {
                            this.useEffect("discover");
                            this.closeInterface();
                        }),
                    new Button(["Augmente de 1 l'initiative d'une créature sur votre terrain pendant ce tour"],
                        () => {
                            this.changePanel(1);
                        })])
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature;
                    },
                    (target: Creature) => {
                        this.useEffect("initiative", target);
                        this.closeInterface();
                    });
        } else {
            this.useEffect("discover");
        }
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect("initiative", target);
        }
        else {
            this.useEffect("discover");
        }
    };

    useEffect = (choice: string, target: Creature | undefined = undefined) => {
        if (choice == "initiative" && target != undefined) {
            this.targeting(target);

            target.stat("Initiative").turn += 1;
        }
        else if (choice == "discover") {
            this.owner().discover(1);
        }

        this.move("Défausse");
        this.pose();
    };
};