import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';
import type { Unit } from '$lib/cards/class/unit';

export class Morsure extends Action {
    name = "Morsure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Augmente de 25 la force d'une créature sur votre terrain.`,
            `Inflige 25 dégâts à une unité sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length == 0) {
            return false;
        }
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
            let ally = undefined;
            let opponent = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (ally == undefined && card instanceof Creature) {
                    ally = card;
                }
            }

            for (const card of this.adversary().zone("Terrain").cards) {
                if (opponent == undefined) {
                    opponent = card;
                }
            }

            if (ally != undefined && opponent != undefined) {
                this.useEffect(ally, opponent);
            }
        }
    };

    useEffect = (ally: Creature, opponent: Unit) => {
        this.targeting(ally);

        ally.stat("Force").increase(25);

        this.targeting(opponent);

        opponent.damageByEffect(25);

        this.move("Défausse");
        this.pose();
    };
};