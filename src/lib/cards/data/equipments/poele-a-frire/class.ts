import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import type { Unit } from '$lib/cards/class/unit';
import { Equipment } from '$lib/cards/class/equipment';
import { Item } from '$lib/cards/class/item';

export class PoeleAFrire extends Equipment {
    name = "Poêle à frire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Feu", 20]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Inflige 10 dégâts spéciaux à l'unité attaquée pour chaque objet de famille Nourriture dans votre défausse.`);
    };

    fightEffect = (defender: Unit) => {
        let damage: number = 0;

        let defausse = copy(this.owner().zone("Défausse").cards);
        for (const card of defausse) {
            if (card instanceof Item && card.isFamily("Nourriture")) {
                damage += 10;
            }
        }

        defender.specialDamage(damage, this);
    };
};