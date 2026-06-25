import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Equipment } from '$lib/cards/class/equipment';

export class LanceIncendiaire extends Equipment {
    name = "Lance incendiaire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 45], ["Feu", 45]]);

        this.initFamily(["Arme"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText([
            `Quand le porteur attaque : Augmente de 5 la brûlure de l'unité attaquée.`,
            `Réduit d'autant l'endurance de l'unité attaquée que la brûlure de celle-ci.`]);
    };

    attackEffect = (defender: Unit) => {
        defender.stat("Brûlure").increase(5);
        defender.stat("Endurance").decrease(defender.stat("Brûlure").value());
    };
};