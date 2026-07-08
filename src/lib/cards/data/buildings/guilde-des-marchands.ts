import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { copy } from '$lib/utils';
import type { Unit } from '$lib/cards/class/unit';

export class GuildeDesMarchands extends Building {
    name = "Guilde des marchands";

    constructor(system: System) {
        super(system);

        this.init([["Or", 160]]);

        this.stat("Constitution").init(20);

        this.addText([
            `Quand se prépare sur le terrain : Génère {card:Marchand} sur votre terrain.`,
            `Augmente de 1 votre production d'or pour chaque {card:Marchand} sur votre terrain.`]);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Marchand").add("Terrain");

            let value: number = 0;
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card.name == "Marchand") {
                    value++;
                }
            }
            this.owner().ressource("Or").increase(value);
        }
    };
};