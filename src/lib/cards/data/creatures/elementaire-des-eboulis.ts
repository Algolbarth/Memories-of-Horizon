import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class ElementaireDesEboulis extends Creature {
    name = "Élémentaire des éboulis";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 30]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Endurance").init(5);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Augmente jusqu'à 1 l'étourdissement d'une créature sur le terrain adverse.`, `Se détruit.`]]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Étourdissement").value() < 1) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        let check = false;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Étourdissement").value() < 1) {
                check = true;
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
                    new Button(["Augmente jusqu'à 1 l'étourdissement d'une créature sur le terrain adverse", "Se détruit"],
                        () => {
                            this.changePanel(1);
                        })])
                .addTarget(
                    [this.adversary().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature && target.stat("Étourdissement").value() < 1;
                    },
                    (target: Creature) => {
                        this.useEffect("effect", target);
                        this.closeInterface();
                    });
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature");
        }
    };

    autoUse = () => {
        let check = false;
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Étourdissement").value() < 1) {
                check = true;
            }
        }

        if (check) {
            this.useEffect("effect");
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature");
        }
    };

    useEffect = (choice: string, target: Creature | undefined = undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.stat("Étourdissement").fix(1);

            this.destroy();
        }

        this.pose();
    };
};