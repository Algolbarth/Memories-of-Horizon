import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class ElementaireDeRacines extends Creature {
    name = "Élémentaire de racines";

    constructor(system: System) {
        super(system);

        this.init([["Nature", 50]]);

        this.initFamily(["Élémentaire", "Plante"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Régénération").init(20);

        this.addChoice([
            `Se place sur votre terrain.`,
            `Éveil : Augmente de 15 sa constitution et sa régénération.`,
        ]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull() || (this.owner().is_player && this.owner().zone("Pile").isNotFull())) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        if (this.owner().zone("Terrain").isNotFull() && this.owner().zone("Pile").isNotFull()) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Se place sur votre terrain"],
                        () => {
                            this.useEffect("creature");
                            this.closeInterface();
                        }),
                    new Button(["Éveil : Augmente de 15 sa constitution et sa régénération"],
                        () => {
                            this.useEffect("effect");
                            this.closeInterface();
                        })]);
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("battlefield");
        }
        else if (this.owner().zone("Pile").isNotFull()) {
            this.useEffect("stack");
        }
    };

    autoUse = () => {
        this.useEffect("battlefield");
    };

    useEffect = (choice: string) => {
        if (choice == "battlefield") {
            this.move("Terrain");
        }
        else if (choice == "stack") {
            this.stat("Constitution").increase(15);
            this.stat("Régénération").increase(15);

            this.stat("Éveil").increase(1);

            this.move("Pile");
        }

        this.pose();
    };
};