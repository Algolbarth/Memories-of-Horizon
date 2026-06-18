import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class PotionDeSoin extends Item {
    name = "Potion de soin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat(601, "Infusion", 5);

        this.addText(`Quand posé : Soigne 2 blessures à une créature sur votre terrain pour chaque valeur d'infusion.`);
        this.addText(`[details {Soigne {card.stat("Infusion").value() * 2} blessures à une créature sur votre terrain.}]`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isDamaged()) {
                return true;
            }
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            let target = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature && card.isDamaged()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.heal(this.stat("Infusion").value() * 2);

        this.move("Défausse");
        this.pose();
    };
};