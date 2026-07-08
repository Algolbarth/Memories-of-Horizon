import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Maire extends Creature {
    name = "Maire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 105]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Produit 5 or pour chaque unité sur votre terrain.`);
    };

    startPhaseEffect = () => {
        this.owner().ressource("Or").produce(5 * this.owner().zone("Terrain").cards.length);
    };
};