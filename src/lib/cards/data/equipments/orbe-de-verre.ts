import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class OrbeDeVerre extends Equipment {
    name = "Orbe de verre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Armure"]);

        this.equipStat("Résistance").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};