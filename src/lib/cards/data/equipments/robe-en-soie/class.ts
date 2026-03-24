import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class RobeEnSoie extends Equipment {
    name = "Robe en soie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitalité").init(25);
        this.equipStat("Résistance").init(12);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};