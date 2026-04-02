import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class FlecheEnflamee extends Item {
    name = "Flèche enflammée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.addChoice([
            `Augmente de 10 la brûlure d'une unité sur le terrain adverse.`,
            `Inflige 30 dégâts spéciaux à une unité sur le terrain adverse.`]);
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
            this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (choice: string, target: Unit) => {
        this.targeting(target);

        if (choice == "burn") {
            target.stat("Brûlure").increase(10);
        }
        else if (choice == "damage") {
            target.specialDamage(30, this);
        }

        this.move("Défausse");
        this.pose();
    };
};