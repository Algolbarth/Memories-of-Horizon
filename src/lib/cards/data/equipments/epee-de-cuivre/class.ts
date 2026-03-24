import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class EpeeDeCuivre extends Equipment {
    name = "Épée de cuivre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};