import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';

export class PeauDEcorce extends Spell {
    name = "Peau d'écorce";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Nature", 8]]);

        this.addText([
            `Quand posé : Augmente de 20 la constitution d'une créature sur votre terrain.`,
            `[sorcery {15, Augmente de 45 la constitution à la place.}]`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
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

        if (this.owner().ressource("Mana").total() >= 15) {
            this.owner().ressource("Mana").spend(15);

            target.stat("Constitution").increase(45);
        }
        else {
            target.stat("Constitution").increase(20);
        }

        this.move("Défausse");
        this.pose();
    };
};