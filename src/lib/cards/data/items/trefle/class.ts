import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Trefle extends Item {
    name = "Trèfle";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Végétal", 8]]);

        this.initFamily(["Plante"]);

        this.addText([
            `Quand posé : Découvre 3 cartes.`,
            `[luck {10, Découvre 4 cartes à la place.}]`]);
    };

    useEffect = () => {
        if (this.owner().nb_cards_read_turn >= 10) {
            this.owner().discover(4);
        }
        else {
            this.owner().discover(3);
        }

        this.move("Défausse");
        this.pose();
    };
};