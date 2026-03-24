import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CarapaceDeTortue extends Equipment {
    name = "Carapace de tortue";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Eau", 8]]);

        this.initFamily(["Armure", "Reptile"]);

        this.equipStat("Endurance").init(15);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};