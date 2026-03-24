import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierDeCristal extends Equipment {
    name = "Bouclier de cristal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(15);
        this.equipStat("Résistance").init(15);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};