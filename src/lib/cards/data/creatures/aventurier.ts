import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class Aventurier extends Creature {
    name = "Aventurier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addChoice([
            `Pioche 1 action.`,
            `Pioche 1 bâtiment.`,
            `Pioche 1 créature.`,
            `Pioche 1 lieu.`,
            `Pioche 1 objet.`]);
    };

    userInterface = () => {
        let types = ["action", "bâtiment", "créature", "lieu", "objet"];
        let choices = [];
        for (const type of types) {
            choices.push(new Button(["Pioche 1 " + type],
                () => {
                    this.useEffect(type.charAt(0).toUpperCase() + type.slice(1));
                    this.closeInterface();
                }));
        }

        this.game().user_interface = new UserInterface(this)
            .addChoice(choices);
    };

    autoUse = () => {
        this.useEffect("Créature");
    };

    useEffect = (choice: string) => {
        let nb_guild: number = 0;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card.name == "Guilde des aventuriers") {
                nb_guild++;
            }
        }

        let readCondition = (card: Card) => {
            if (card.type == choice) {
                return true;
            }
            return false;
        };
        this.owner().draw(1 + nb_guild, readCondition);

        this.move("Terrain");
        this.pose();
    };
};