import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ArcEnBois extends Equipment {
    name = "Arc en bois";

    constructor(system: System) {
        super(system);

        this.init([["Or", 7]]);

        this.initFamily(["Arme"]);

        this.equipStat("Portée").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};