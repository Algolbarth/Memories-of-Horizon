import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { Stat } from '$lib/cards/class/stat';
import Use from './use.svelte';

export class Lait extends Item {
    name = "Lait";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            "Quand posé : Soigne 20 blessures à une créature sur votre terrain.",
            "[satiety {Retire un effet négatif à cette créature à la place.}]"]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isDamaged() || card.hasDebuff())) {
                return true;
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isFullLife() && card.hasDebuff())) {
                return true;
            }
        }
        return false;
    };

    select = () => {
        let check = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (check == false && card instanceof Creature && (card.isDamaged() || card.hasDebuff())) {
                check = true;
            }
        }

        if (check) {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                let target = undefined;
                let stat = undefined;

                for (const card of this.owner().zone("Terrain").cards) {
                    if (target == undefined && card instanceof Creature && (card.isDamaged() || card.hasDebuff())) {
                        target = card;
                        if (card.isFullLife() && card.hasDebuff()) {
                            for (const s of card.stats) {
                                if (s.debuff && s.value() > s.min) {
                                    stat = s;
                                }
                            }
                        }
                    }
                }

                if (target != undefined) {
                    this.useEffect(target, stat);
                }
            }
        }

    };

    useEffect = (target: Creature, stat: Stat | undefined) => {
        this.targeting(target);

        if (!target.isDamaged() && stat != undefined) {
            stat.set(stat.min);
        }
        else {
            target.heal(20);
        }

        this.move("Défausse");
        this.pose();
    };
};