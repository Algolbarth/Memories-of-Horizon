import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Meteore extends Item {
    name = "Météore";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Spatial"]);

        this.addChoice([
            `Stocke 1 flux.`,
            `Inflige 40 dégâts spéciaux à une unité sur le terrain adverse.`]);
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
                this.useEffect("stockage");
            }
        }
        else {
            this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (choice: string, target: Unit | undefined = undefined) => {
        if (choice == "stockage") {
            this.owner().ressource("Flux").stock(1);
        }
        else if (choice == "damage" && target != undefined) {
            this.targeting(target);

            target.specialDamage(40, this);
        }

        this.move("Défausse");
        this.pose();
    };
};