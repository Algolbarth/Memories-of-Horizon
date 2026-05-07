import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Building } from '$lib/cards/class/building';

export class BibliothequeIncendiee extends Building {
    name = "Bibliothèque incendiée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35], ["Feu", 35]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand un {card:Autodafé} ou un {card:Bûcher des vanités} allié est posé : Génère {card:Écrits calcinés} dans votre inventaire.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card) && ["Autodafé", "Bûcher des vanités"].includes(card.name)) {
            this.owner().getCard("Écrits calcinés").add("Inventaire");
        }
    };
};