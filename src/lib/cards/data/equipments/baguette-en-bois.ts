import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BaguetteEnBois extends Equipment {
    name = "Baguette en bois";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Arme"]);

        this.equipStat("Magie").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};