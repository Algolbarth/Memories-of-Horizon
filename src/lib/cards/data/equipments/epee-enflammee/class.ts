import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class EpeeEnflammee extends Equipment {
    name = "Épée enflammée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(50);
        this.equipStat("Affliction").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};