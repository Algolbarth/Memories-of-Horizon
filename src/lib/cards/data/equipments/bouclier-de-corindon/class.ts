import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierDeCorindon extends Equipment {
    name = "Bouclier de corindon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(50);
        this.equipStat("Résistance").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};