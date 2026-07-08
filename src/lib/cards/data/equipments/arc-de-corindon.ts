import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ArcDeCorindon extends Equipment {
    name = "Arc de corindon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.initFamily(["Arme"]);

        this.equipStat("Portée").init(100);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};