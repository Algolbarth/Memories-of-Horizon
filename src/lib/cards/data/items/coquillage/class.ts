import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Coquillage extends Item {
    name = "Coquillage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10]]);

        this.addText(`Quand posé : Réduit de 5 votre production d'eau pour augmenter de 5 votre production d'or.`);
    };

    canUse = () => {
        if (this.owner().ressource("Eau").production >= 5) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().ressource("Eau").decrease(5);
        this.owner().ressource("Or").increase(5);

        this.move("Défausse");
        this.pose();
    };
};