import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class LanceDePlatine extends Equipment {
    name = "Lance de platine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(150);
        this.equipStat("Percée").init(100);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};