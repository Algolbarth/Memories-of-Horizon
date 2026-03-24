import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class PuitDeMana extends Building {
    name = "Puit de mana";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand se prépare sur le terrain : Génère {card:Potion de mana} dans votre inventaire.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Potion de mana").add("Inventaire");
        }
    };
};