import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class GanteletsEnCuir extends Equipment {
    name = "Gantelets en cuir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Armure"]);

        this.equipStat("Maîtrise").init(1);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};