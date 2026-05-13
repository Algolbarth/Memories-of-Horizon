import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class BouclierDeRoche extends Equipment {
    name = "Bouclier de roche";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Terre", 25]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").init(25);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur est attaqué : Augmente de 5 l'endurance du porteur.`);
    };

    defendEffect = () => {
        this.bearer.stat("Endurance").increase(5);
    };
};