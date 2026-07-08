import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Conque extends Item {
    name = "Conque";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10]]);

        this.addText(`Quand posé : Réduit de 5 votre production d'or pour augmenter de 5 votre production d'eau.`);
    };

    canUse = () => {
        if (this.owner().ressource("Or").production >= 5) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().ressource("Or").decrease(5);
        this.owner().ressource("Eau").increase(5);

        this.move("Défausse");
        this.pose();
    };
};