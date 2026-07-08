import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class ElementaireDeRonces extends Creature {
    name = "Élémentaire de ronces";

    constructor(system: System) {
        super(system);

        this.init([["Nature", 75]]);

        this.initFamily(["Élémentaire", "Plante"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);
        this.stat("Épine").init(10);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Éveil : Augmente de 75 sa constitution.`, `Augmente de 10 son épine.`],
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
            this.stat("Constitution").increase(75);
            this.stat("Épine").increase(10);

            this.stat("Éveil").increase(1);

            this.move("Pile");
        }

        this.pose();
    };
};