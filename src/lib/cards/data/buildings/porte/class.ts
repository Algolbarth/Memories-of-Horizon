import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Porte extends Building {
    name = "Porte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 6]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand périt : Pioche 1 carte et la verrouille.`);
    };

    perishEffect = () => {
        let cards = this.owner().draw(1);
        for (const c of cards) {
            c.lock();
        }
    };
};