import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BrassardDeSante extends Equipment {
    name = "Brassard de santé";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Régénération").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};