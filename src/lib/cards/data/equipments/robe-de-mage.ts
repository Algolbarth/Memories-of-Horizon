import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class RobeDeMage extends Equipment {
    name = "Robe de mage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Armure", "Mage"]);

        this.equipStat("Constitution").init(20);
        this.equipStat("Résistance").init(15);
        this.equipStat("Magie").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};