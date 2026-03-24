import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class PlastronEnCuir extends Equipment {
    name = "Plastron en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 7]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitalité").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};