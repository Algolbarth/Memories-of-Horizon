import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class GanteletsDeFer extends Equipment {
    name = "Gantelets de fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 60]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitalité").init(30);
        this.equipStat("Endurance").init(15);
        this.equipStat("Maîtrise").init(1);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};