import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CasqueAPic extends Equipment {
    name = "Casque à pic";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(10);
        this.equipStat("Épine").init(10);
        this.equipStat("Vigueur").init(15);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};