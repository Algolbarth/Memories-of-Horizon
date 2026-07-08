import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class PlastronEnFer extends Equipment {
    name = "Plastron en fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Constitution").init(45);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};