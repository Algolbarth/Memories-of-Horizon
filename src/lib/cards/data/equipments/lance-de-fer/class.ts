import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class LanceDeFer extends Equipment {
    name = "Lance de fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(25);
        this.equipStat("Percée").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};