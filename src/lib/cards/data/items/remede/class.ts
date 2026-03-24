import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import type { Stat } from '$lib/cards/class/stat';
import Use from './use.svelte';

export class Remede extends Item {
    name = "Remède";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Retire un effet négatif d'une créature sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.hasDebuff()) {
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
            let debuff = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature && card.hasDebuff()) {
                    for (const stat of card.stats) {
                        if (stat.debuff && stat.condition()) {
                            target = card;
                            debuff = stat;
                        }
                    }
                }
            }

            if (target != undefined && debuff != undefined) {
                this.useEffect(target, debuff);
            }
        }
    };

    useEffect = (target: Unit, stat: Stat) => {
        this.targeting(target);

        stat.set(stat.min);

        this.move("Défausse");
        this.pose();
    };
};