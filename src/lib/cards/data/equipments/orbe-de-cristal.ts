import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class OrbeDeCristal extends Equipment {
    name = "Orbe de cristal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Armure"]);

        this.equipStat("Résistance").init(25);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};