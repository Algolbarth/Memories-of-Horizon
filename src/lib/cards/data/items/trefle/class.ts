import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Trefle extends Item {
    name = "Trèfle";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Végétal", 10]]);

        this.initFamily(["Plante"]);

        this.addText(`Quand posé : Découvre 4 cartes.`);
    };

    useEffect = () => {
        this.owner().discover(4);

        this.move("Défausse");
        this.pose();
    };
};