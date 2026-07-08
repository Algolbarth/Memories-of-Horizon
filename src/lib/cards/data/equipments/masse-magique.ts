import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MasseMagique extends Equipment {
    name = "Masse magique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 60]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(20);
        this.equipStat("Magie").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Stocke 5 mana.`);
    };

    attackEffect = () => {
        this.owner().ressource("Mana").stock(5);
    };
};