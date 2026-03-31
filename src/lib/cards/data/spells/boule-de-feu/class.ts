import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';

export class BouleDeFeu extends Spell {
    name = "Boule de feu";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Feu", 8]]);

        this.addText([
            `Quand posé : Inflige 30 dégâts spéciaux à une unité sur le terrain adverse.`,
            `[sorcery {15, inflige 60 dégâts spéciaux à la place.}]`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect(this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        if (this.owner().ressource("Mana").total() >= 15) {
            this.owner().ressource("Mana").spend(15);
            target.specialDamage(60, this);
        }
        else {
            target.specialDamage(30, this);
        }

        this.move("Défausse");
        this.pose();
    };
};