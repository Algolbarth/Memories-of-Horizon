import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class PotionExplosive extends Item {
    name = "Potion explosive";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat("Infusion", 5);

        this.addText(`Quand posé : Inflige 2 dégâts à une unité sur le terrain adverse pour chaque valeur d'infusion.`);
        this.addText(`[details {Inflige {card.stat("Infusion").value() * 2} dégâts à une unité sur le terrain adverse.}]`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect(this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.damageByEffect(this.stat("Infusion").value() * 2);

        this.move("Défausse");
        this.pose();
    };
};