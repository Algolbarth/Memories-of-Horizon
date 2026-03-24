import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class DoublesLamesDeFer extends Equipment {
    name = "Doubles lames de fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(10);
        this.equipStat("Agilité").init(1);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};