import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class EcritCalcines extends Item {
    name = "Écrits calcinés";

    constructor(system: System) {
        super(system);

        this.init([["Or", 6], ["Feu", 6]]);

        this.addText([
            `Quand posé : Si votre pile est vide : Découvre 5 cartes.`,
            `[resolve {125, Découvre autant de carte que nécessaire pour remplir la pile à la place.}]`]);
    };

    canUse = () => {
        if (this.owner().zone("Pile").cards.length == 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        if (this.owner().totalIntelligence() >= 125) {
            this.owner().discover(this.owner().zone("Pile").size - this.owner().zone("Pile").cards.length);
        }
        else {
            this.owner().discover(5);
        }

        this.move("Défausse");
        this.pose();
    };
};
