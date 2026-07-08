import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ArcDeCristal extends Equipment {
    name = "Arc de cristal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75]]);

        this.initFamily(["Arme"]);

        this.equipStat("Portée").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};