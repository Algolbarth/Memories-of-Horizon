import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class Boussole extends Item {
    name = "Boussole";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addChoice([
            `Pioche 1 carte pour chaque lieu dans votre région.`,
            `Pioche 1 lieu.`]);
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Pioche 1 carte pour chaque lieu dans votre région"],
                    () => {
                        this.useEffect("draw");
                        this.closeInterface();
                    }),
                new Button(["Pioche 1 lieu"],
                    () => {
                        this.useEffect("location");
                        this.closeInterface();
                    })]);
    };

    autoUse = () => {
        this.useEffect("draw");
    };

    useEffect = (choice: string) => {
        if (choice == "draw") {
            this.owner().draw(this.owner().zone("Région").cards.length);
        }
        else if (choice == "location") {
            let readCondition = (card: Card) => {
                if (card instanceof Location) {
                    return true;
                }
                return false;
            };
            this.owner().draw(1, readCondition);
        }

        this.move("Défausse");
        this.pose();
    };
};