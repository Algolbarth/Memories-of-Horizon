import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Arbalete extends Equipment {
    name = "Arbalète";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Portée").init(10);
        this.equipStat("Percée").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};