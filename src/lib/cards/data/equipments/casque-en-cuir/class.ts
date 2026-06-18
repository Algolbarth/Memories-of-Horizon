import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CasqueEnCuir extends Equipment {
    name = "Casque en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Armure"]);

        this.equipStat("Vigueur").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};