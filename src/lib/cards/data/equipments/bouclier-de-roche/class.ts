import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierDeRoche extends Equipment {
    name = "Bouclier de roche";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Terre", 10]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur est attaqué : Augmente de 2 l'endurance du porteur.`);
    };

    defendEffect = () => {
        this.bearer.stat("Endurance").increase(2);
    };
};