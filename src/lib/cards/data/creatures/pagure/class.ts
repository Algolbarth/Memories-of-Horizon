import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class Pagure extends Creature {
    name = "Pagure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.stat("Constitution").init(2);
        this.stat("Force").init(2);
        this.stat("Endurance").init(3);

        this.addChoice([
            `Génère {card:Coquillage} dans votre inventaire.`,
            `Génère {card:Conque} dans votre inventaire.`]);
    };

    userInterface = () => {
        if (this.owner().zone("Inventaire").isNotFull()) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Génère Coquillage dans votre inventaire"],
                        () => {
                            this.useEffect("Coquillage");
                            this.closeInterface();
                        }),
                    new Button(["Génère Conque dans votre inventaire"],
                        () => {
                            this.useEffect("Conque");
                            this.closeInterface();
                        })]);
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        if (this.owner().zone("Inventaire").isNotFull()) {
            this.useEffect("Conque");
        }
        else {
            this.useEffect();
        }
    };

    useEffect = (choice: string | undefined = undefined) => {
        if (choice != undefined) {
            this.owner().getCard(choice).add("Inventaire");
        }

        this.move("Terrain");
        this.pose();
    };
};