import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/class';

export class Banque extends Building {
    name = "Banque";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.stat("Constitution").init(50);

        this.addStat("Intérêts", 5);

        this.addText(`Quand une autre carte alliée est vendue : Augmente de 1 ses intérêts et augmente de 5 sa vente en or.`);
        this.addText(`Quand se prépare sur le terrain : Produit autant d'or que ses intérêts.`);
    };

    otherSellEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card)) {
            this.stat("Intérêts").increase(1);

            this.getSale("Or").increase(5);
        }
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Or").produce(this.stat("Intérêts").value());
        }
    };
};