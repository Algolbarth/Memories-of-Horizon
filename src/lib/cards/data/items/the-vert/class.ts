import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class TheVert extends Item {
    name = "Thé vert";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Nature", 5]]);

        this.initFamily(["Nourriture", "Plante"]);

        this.addText([
            "Quand posé : Soigne 20 blessures à une créature sur votre terrain.",
            "[satiety {Augmente de 2 l'intelligence de cette créature à la place.}]"]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFullLife()) {
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
                if (target == undefined && card instanceof Creature) {
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
            target.stat("Intelligence").increase(2);
        }
        else {
            target.heal(20);
        }

        this.move("Défausse");
        this.pose();
    };
};