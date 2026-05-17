import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';
import { copy } from '$lib/utils';
import type { Unit } from '$lib/cards/class/unit';

export class GuildeDesMarchands extends Building {
    name = "Guilde des marchands";

    constructor(system: System) {
        super(system);

        this.init([["Or", 130]]);

        this.stat("Constitution").init(30);

        this.addText([
            `Quand se prépare sur le terrain : Génère {card:Marchand} dans votre inventaire.`,
            `Augmente de 1 votre production d'or pour chaque {card:Marchand} sur votre terrain.`]);
        this.addText(`Quand un {card:Marchand} allié est posé : Si sur le terrain : Augmente de 1 votre production d'or.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Marchand").add("Inventaire");
        }

        let value: number = 0;
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card.name == "Marchand") {
                value++;
            }
        }
        this.owner().ressource("Or").increase(1);
    };

    otherPoseEffect = (card: Card) => {
        if (card.name == "Marchand" && card.isAlly(this)) {
            this.owner().ressource("Or").increase(1);
        }
    };
};