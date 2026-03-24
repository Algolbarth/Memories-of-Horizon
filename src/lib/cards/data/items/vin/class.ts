import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Vin extends Item {
    name = "Vin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            "Quand posé : Soigne 50 blessures à une créature sur votre terrain.",
            "[satiety {remplit la jauge critique de cette créature à la place.}]"]);
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
            target.stat("Critique").set(100);
        }
        else {
            target.heal(50);
        }

        this.move("Défausse");
        this.pose();
    };
};