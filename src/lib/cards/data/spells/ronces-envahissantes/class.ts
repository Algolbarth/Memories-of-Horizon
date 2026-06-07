import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';
import { Unit } from '$lib/cards/class/unit';

export class RoncesEnvahissantes extends Spell {
    name = "Ronces envahissantes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.addChoice([
            [`Augmente de 10 l'épine d'une unité sur votre terrain.`,
                `[sorcery {25, Augmente de 20 l'épine à la place.}]`],
            [`Inflige 50 dégâts à une unité sur le terrain adverse.`,
                `[sorcery {25, Inflige 100 dégâts à la place.}]`]]);
    };

    canUse = () => {
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Unit) {
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
                if (target == undefined) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect("thorn", target);
            }
        }
    };

    useEffect = (choice: string, target: Unit) => {
        this.targeting(target);

        if (this.owner().ressource("Mana").total() >= 25) {
            this.owner().ressource("Mana").spend(25);

            if (choice == "thorn") {
                target.stat("Épine").increase(20);
            }
            else if (choice == "damage") {
                target.specialDamage(100, this);
            }
        }
        else {
            if (choice == "thorn") {
                target.stat("Épine").increase(10);
            }
            else if (choice == "damage") {
                target.specialDamage(50, this);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};