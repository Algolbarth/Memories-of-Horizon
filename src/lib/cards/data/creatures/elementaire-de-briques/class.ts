import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class ElementaireDeBriques extends Creature {
    name = "Élémentaire de briques";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 30]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(10);
        this.stat("Endurance").init(5);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Augmente de 25 la constitution d'un bâtiment sur votre terrain.`, `Augmente de 15 l'endurance de ce bâtiment.`, `Se détruit.`]]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building) {
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
            if (card instanceof Building) {
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
                    new Button(["Augmente de 25 la constitution d'un bâtiment sur votre terrain", "Augmente de 15 l'endurance de ce bâtiment", "Se détruit"],
                        () => {
                            this.changePanel(1);
                        })])
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Building;
                    },
                    (target: Building) => {
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
            if (target == undefined && card instanceof Building) {
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


    useEffect = (choice: string, target: Building | undefined = undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.stat("Constitution").increase(25);
            target.stat("Endurance").increase(15);
        }

        this.pose();
    };
};