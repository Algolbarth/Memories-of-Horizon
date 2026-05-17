import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';
import type { Unit } from '$lib/cards/class/unit';
import { copy } from '$lib/utils';

export class BoiteDeChoolat extends Item {
    name = "Boîte de chocolat";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            "Quand posé : Soigne 100 blessures à une créature sur votre terrain.",
            "[satiety {Augmente de 5 la constitution et la force de toutes les créatures sur votre terrain à la place.}]"]);
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
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Constitution").increase(5);
                    card.stat("Force").increase(5);
                }
            }
        }
        else {
            target.heal(100);
        }

        this.move("Défausse");
        this.pose();
    };
};