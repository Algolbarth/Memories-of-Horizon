import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Crochetage extends Action {
    name = "Crochetage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText(`Quand posé : Réduit de 1 le niveau de votre pile pendant ce tour.`);
    };

    useEffect = () => {
        this.owner().zone("Pile").turn_level -= 1;

        this.move("Défausse");
        this.pose();
    };
};