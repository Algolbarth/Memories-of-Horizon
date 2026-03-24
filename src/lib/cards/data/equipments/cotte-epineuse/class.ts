import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CotteEpineuse extends Equipment {
    name = "Cotte épineuse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitalité").init(20);
        this.equipStat("Endurance").init(10);
        this.equipStat("Épine").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};