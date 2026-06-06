import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';
import { Creature } from '$lib/cards/class/creature';

export class AuraDeSpores extends Spell {
    name = "Aura de spores";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.addChoice([
            [`Augmente de 10 la radiation d'une créature sur votre terrain.`,
                `[sorcery {25, Augmente de 20 la radiation à la place.}]`],
            [`Augmente de 5 le poison d'une créature sur le terrain adverse.`,
                `Augmente de 10 la toxicité de cette créature.`,
                `[sorcery {25, Augmente de 30 la toxicité à la place.}]`]]);
    };

    canUse = () => {
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature) {
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

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect("radiation", target);
            }
        }
    };

    useEffect = (choice: string, target: Creature) => {
        this.targeting(target);

        if (this.owner().ressource("Mana").total() >= 25) {
            this.owner().ressource("Mana").spend(25);

            if (choice == "radiation") {
                target.stat("Radiation").increase(20);
            }
            else if (choice == "poison") {
                target.stat("Poison").increase(5);
                target.stat("Toxicité").increase(30);
            }
        }
        else {
            if (choice == "radiation") {
                target.stat("Radiation").increase(10);
            }
            else if (choice == "poison") {
                target.stat("Poison").increase(5);
                target.stat("Toxicité").increase(10);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};