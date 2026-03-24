import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class HacheDeFer extends Equipment {
    name = "Hache de fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Arme"]);

        this.equipStat("Adresse").init(35);
        this.equipStat("Intensité").init(1);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};