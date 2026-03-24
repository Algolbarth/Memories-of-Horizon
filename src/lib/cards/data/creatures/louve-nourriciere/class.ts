import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class LouveNourriciere extends Creature {
    name = "Louve nourricière";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand se prépare sur le terrain : Génère 2 {card:Louveteau} sur votre terrain.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Louveteau").add("Terrain");
            this.owner().getCard("Louveteau").add("Terrain");
        }
    };
};