import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class PortheBonheur extends Equipment {
    name = "Porte-bonheur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.equipStat("Adresse").init(25);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Au début de la phase de combat : Si équipé et que le porteur est sur le terrain : [luck {40, Augmente de 1 l'esquive du porteur.}]`);
    };
};