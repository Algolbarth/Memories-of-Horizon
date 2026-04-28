import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Item } from '$lib/cards/class/item';

export class LivreDeRecette extends Item {
    name = "Livre de recette";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Découvre 3 cartes de famille Nourriture.`,
            `[resolve {20, Découvre 5 cartes de famille Nourriture à la place.}]`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card.isFamily("Nourriture")) {
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