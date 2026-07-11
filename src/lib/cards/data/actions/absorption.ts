import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Absorption extends Action {
    name = "Absorption";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Eau", 30]]);

        this.addChoice([
            `Augmente de 5 votre production d'eau.`,
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
                new Button(["Augmente de 5 votre production d'eau"],
                    () => {
                        this.useEffect("ressource");
                        this.closeInterface();
                    }),
                new Button(["Augmente de 50 la constitution et la force d'une créature sur votre terrain"],
                    () => {
                        this.changePanel(1);
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect("balance", target);
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
            this.useEffect("balance", target);
        }
        else {
            this.useEffect("ressource");
        }
    };

    useEffect = (choice: string, target: Creature | undefined = undefined) => {
        if (choice == "ressource") {
            this.owner().ressource("Eau").increase(5);
        }
        else if (choice == "balance" && target != undefined) {
            this.targeting(target);

            target.stat("Force").increase(50);
            target.stat("Constitution").increase(50);
        }

        this.move("Défausse");
        this.pose();
    };
};