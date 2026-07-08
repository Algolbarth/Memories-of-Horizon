import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class ElementaireDArgile extends Creature {
    name = "Élémentaire d'argile";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 25]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Endurance").init(10);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Augmente de 10 la constitution, la force et l'endurance d'une créature sur votre terrain.`, `Se détruit.`]]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Se place sur votre terrain"],
                        () => {
                            this.useEffect("creature");
                            this.closeInterface();
                        }),
                    new Button(["Augmente de 10 la constitution, la force et l'endurance d'une créature sur votre terrain", "Se détruit"],
                        () => {
                            this.changePanel(1);
                        })])
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature;
                    },
                    (target: Creature) => {
                        this.useEffect("effect", target);
                        this.closeInterface();
                    });
        }
        else {
            this.useEffect("creature");
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
            this.useEffect("effect", target);
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature", undefined);
        }
    };

    useEffect = (choice: string, target: Creature | undefined = undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.stat("Constitution").increase(10);
            target.stat("Force").increase(10);
            target.stat("Endurance").increase(10);
        }

        this.pose();
    };
};