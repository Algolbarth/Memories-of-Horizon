import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Action } from '$lib/cards/class/action';

export class Aventure extends Action {
    name = "Aventure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Pioche 1 action, 1 bâtiment, 1 créature, 1 lieu et 1 objet.`);
    };

    useEffect = () => {
        let types = ["Action", "Bâtiment", "Créature", "Lieu", "Objet"];
        for (let i = 0; i < types.length; i++) {
            let readCondition = (card: Card) => {
                if (card.type == types[i]) {
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