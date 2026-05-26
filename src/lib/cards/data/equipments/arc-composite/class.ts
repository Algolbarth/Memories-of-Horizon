import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ArcComposite extends Equipment {
    name = "Arc composite";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Arme"]);

        this.equipStat("Portée").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};