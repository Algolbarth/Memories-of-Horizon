import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CotteDeMaillesEnPlatine extends Equipment {
    name = "Cotte de mailles en platine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitalité").init(75);
        this.equipStat("Endurance").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};