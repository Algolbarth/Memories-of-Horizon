import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class TuniqueDeCuir extends Equipment {
    name = "Tunique de cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitalité").init(20);
        this.equipStat("Endurance").init(8);
        this.equipStat("Résistance").init(8);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};