import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Livre extends Item {
    name = "Livre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Livre"]);

        this.addText([
            `Quand posé : Découvre 1 carte.`,
            `[resolve {10, Découvre 2 cartes à la place.}]`]);
    };

    useEffect = () => {
        if (this.owner().totalIntelligence() >= 10) {
            this.owner().discover(2);
        }
        else {
            this.owner().discover(1);
        }

        this.move("Défausse");
        this.pose();
    };
};
