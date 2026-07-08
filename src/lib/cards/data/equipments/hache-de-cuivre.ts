import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class HacheDeCuivre extends Equipment {
    name = "Hache de cuivre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Adresse").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
    };
};