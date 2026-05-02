import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ManteauDeRonces extends Equipment {
    name = "Manteau de ronces";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Nature", 50]]);

        this.initFamily(["Armure"]);

        this.equipStat("Constitution").init(75);
        this.equipStat("Épine").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};