import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierDePlatine extends Equipment {
    name = "Bouclier de platine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(100);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};