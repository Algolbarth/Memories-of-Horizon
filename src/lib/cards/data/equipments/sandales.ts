import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Sandales extends Equipment {
    name = "Sandales";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitesse").init(1);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};