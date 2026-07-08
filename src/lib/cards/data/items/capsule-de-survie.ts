import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class CapsuleDeSurvie extends Item {
    name = "Capsule de survie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Spatial"]);

        this.addChoice([
            `Stocke 1 flux.`,
            [`Pioche 1 créature.`,
                `Réduis de 35 le coût de cette créature.`]]);
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Stocke 1 flux"],
                    () => {
                        this.useEffect("draw");
                        this.closeInterface();
                    }),
                new Button(["Pioche 1 créature", "Réduis de 35 le coût de cette créature"],
                    () => {
                        this.useEffect("location");
                        this.closeInterface();
                    })]);
    };

    autoUse = () => {
        this.useEffect("draw");
    };

    useEffect = (choice: string) => {
        if (choice == "stockage") {
            this.owner().ressource("Flux").stock(1);
        }
        else if (choice == "draw") {
            let readCondition = (card: Card) => {
                if (card instanceof Creature) {
                    return true;
                }
                return false;
            };
            let cards: Card[] = this.owner().draw(1, readCondition);
            if (cards[0] != undefined) {
                cards[0].costReduce(35);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};