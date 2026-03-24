import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Biere extends Item {
    name = "Bière";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            `Quand posé : Soigne 20 blessures à une créature sur votre terrain.`,
            `[satiety {Augmente de 50% la jauge critique de cette créature à la place.}]`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isDamaged() || card.stat("Critique").value() < 100)) {
                return true;
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isFullLife() && card.stat("Critique").value() < 100)) {
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
                if (target == undefined && card instanceof Creature && (card.isDamaged() || card.stat("Critique").value() < 100)) {
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
            target.stat("Critique").increase(50);
            if (target.stat("Critique").value() > 100) {
                target.stat("Critique").set(100);
            }
        }
        else {
            target.heal(20);
        }

        this.move("Défausse");
        this.pose();
    };
};