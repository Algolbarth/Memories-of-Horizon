import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Equipment } from '$lib/cards/class/equipment';

export class MasseDArmesSulfurique extends Equipment {
    name = "Masse d'armes sulfurique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Feu", 50]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(25);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Inflige autant de dégâts spéciaux à l'unité attaquée que la force du porteur.`);
    };

    attackEffect = (defender: Unit) => {
        defender.specialDamage(this.bearer.stat("Force").value(), this);
    };
};