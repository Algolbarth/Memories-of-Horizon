import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BottesEnCuir extends Equipment {
    name = "Bottes en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vitesse").init(3);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};