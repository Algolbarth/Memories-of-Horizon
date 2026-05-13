import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierDEpine extends Equipment {
    name = "Bouclier d'épine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(15);
        this.equipStat("Épine").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};