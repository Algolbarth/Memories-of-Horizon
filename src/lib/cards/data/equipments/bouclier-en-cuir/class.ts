import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierEnCuir extends Equipment {
    name = "Bouclier en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};