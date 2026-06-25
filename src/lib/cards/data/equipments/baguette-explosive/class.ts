import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Equipment } from '$lib/cards/class/equipment';

export class BaguetteExplosive extends Equipment {
    name = "Baguette explosive";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40], ["Feu", 35]]);

        this.initFamily(["Arme"]);

        this.equipStat("Magie").init(25);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Inflige autant de dégâts spéciaux à l'unité attaquée que la magie du porteur.`);
    };

    attackEffect = (defender: Unit) => {
        defender.specialDamage(this.bearer.stat("Magie").value(), this);
    };
};