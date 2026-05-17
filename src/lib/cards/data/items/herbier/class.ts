import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Item } from '$lib/cards/class/item';

export class Herbier extends Item {
    name = "Herbier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Nature", 12]]);

        this.initFamily(["Livre"]);

        this.addText([
            "Quand posé : Découvre 3 cartes de famille Plante.",
            "[resolve {20, Découvre 5 cartes de famille Plante à la place.}]"]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.isFamily("Plante")) {
                return true;
            }
            return false;
        };

        if (this.owner().totalIntelligence() >= 20) {
            this.owner().discover(5, readCondition);
        }
        else {
            this.owner().discover(3, readCondition);
        }

        this.move("Défausse");
        this.pose();
    };
};