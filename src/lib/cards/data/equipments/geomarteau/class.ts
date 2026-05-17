import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Equipment } from '$lib/cards/class/equipment';
import type { Unit } from '$lib/cards/class/unit';

export class Geomarteau extends Equipment {
    name = "Géomarteau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75], ["Terre", 75]]);

        this.initFamily(["Arme"]);

        this.addStat("Secousses", 0);
        this.stat("Secousses").display = () => {
            return true;
        };

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Augmente de 3 ses secousses. Inflige autant de dégâts spéciaux à toutes les unités sur le terrain adverse que ses secousses.`);
    };

    fightEffect = () => {
        this.stat("Secousses").increase(3);

        let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
        for (const card of adversary_battlefield) {
            card.specialDamage(this.stat("Secousses").value(), this);
        }
    };
};