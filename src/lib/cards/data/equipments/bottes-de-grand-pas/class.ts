import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BottesDeGrandPas extends Equipment {
    name = "Bottes de grand pas";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitesse").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};