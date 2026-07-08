import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class ElementaireDeFeuilles extends Creature {
    name = "Élémentaire de feuilles";

    constructor(system: System) {
        super(system);

        this.init([["Nature", 15]]);

        this.initFamily(["Élémentaire", "Plante"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);

        this.addChoice([
            `Se place sur votre terrain.`,
            `Éveil : Augmente de 15 sa force et sa constitution.`,
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
                    new Button(["Éveil : Augmente de 15 sa force et sa constitution"],
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
            this.stat("Force").increase(15);

            this.stat("Éveil").increase(1);

            this.move("Pile");
        }

        this.pose();
    };
};