import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BaguetteDArchimage extends Equipment {
    name = "Baguette d'archimage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Arme", "Mage"]);

        this.equipStat("Magie").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};