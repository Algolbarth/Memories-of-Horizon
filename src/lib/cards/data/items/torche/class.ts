import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Torche extends Item {
    name = "Torche";

    constructor(system: System) {
        super(system);

        this.init([["Or", 6], ["Feu", 6]]);

        this.addChoice([
            `Augmente de 1 votre production de feu.`,
            `Inflige 20 dégâts spéciaux à une unité sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.owner().is_player || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            if (this.adversary().zone("Terrain").cards.length > 0) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("production");
            }
        }
        else {
            this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (choice: string, target: Unit | undefined = undefined) => {
        if (choice == "production") {
            this.owner().ressource("Feu").increase(1);
        }
        else if (choice == "damage" && target != undefined) {
            this.targeting(target);

            target.specialDamage(20, this);
        }

        this.move("Défausse");
        this.pose();
    };
};