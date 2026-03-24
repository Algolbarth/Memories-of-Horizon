import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class NoixDeCoco extends Item {
    name = "Noix de coco";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Eau", 12]]);

        this.initFamily(["Nourriture", "Plante"]);

        this.addText([
            "Quand posé : Soigne 50 blessures à une créature sur le terrain.",
            "[satiety {Augmente jusqu'à 1 l'étourdissement de cette créature à la place.}]"]);
    };

    canUse = () => {
        if (this.owner().is_player) {
            for (const entity of [this.owner(), this.adversary()]) {
                for (const card of entity.zone("Terrain").cards) {
                    if (card instanceof Creature && (card.isDamaged() || card.stat("Étourdissement").value() == 0)) {
                        return true;
                    }
                }
            }
        }
        else {
            for (const card of this.owner().zone("Terrain").cards) {
                if (card instanceof Creature && card.isDamaged()) {
                    return true;
                }
            }
            for (const card of this.adversary().zone("Terrain").cards) {
                if (card instanceof Creature && card.stat("Étourdissement").value() == 0) {
                    return true;
                }
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature && (card.isFullLife() && card.stat("Étourdissement").value() == 0)) {
                    return true;
                }
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

            for (const card of this.adversary().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature && card.stat("Étourdissement").value() == 0) {
                    target = card;
                }
            }
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

        if (!target.isDamaged()) {
            target.stat("Étourdissement").fix(1);
        }
        else {
            target.heal(50);
        }

        this.move("Défausse");
        this.pose();
    };
};