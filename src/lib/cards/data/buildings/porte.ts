import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';

export class Porte extends Building {
    name = "Porte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.stat("Constitution").init(10);

        this.addText(`Quand meurt : Pioche 5 cartes et les verrouille.`);
    };

    dieEffect = () => {
        let cards: Card[] = this.owner().draw(5);
        for (const c of cards) {
            c.lock();
        }
    };
};