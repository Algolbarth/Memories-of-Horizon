import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';
import { Creature } from '$lib/cards/class/creature';

export class FlecheEmpoisonnee extends Item {
    name = "Flèche empoisonnée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText([
            `Quand posé : Augmente de 5 le poison d'une créature sur le terrain adverse.`,
            `Augmente de 10 la toxicité de cette créature.`]);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
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

            for (const card of this.adversary().zone("Terrain").cards) {
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

        target.stat("Poison").increase(5);
        target.stat("Toxicité").increase(10);

        this.move("Défausse");
        this.pose();
    };
};