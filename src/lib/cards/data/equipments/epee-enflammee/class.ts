import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Equipment } from '$lib/cards/class/equipment';

export class EpeeEnflammee extends Equipment {
    name = "Épée enflammée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Inflige 50 dégâts spéciaux à l'unité attaquée.`);
    };

    fightEffect = (defender: Unit) => {
        defender.specialDamage(50, this);
    };
};