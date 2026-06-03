import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class ElementaireDeCailloux extends Creature {
    name = "Élémentaire de cailloux";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 5]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(2);
        this.stat("Force").init(2);
        this.stat("Endurance").init(1);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Inflige 5 dégâts spéciaux à une unité sur le terrain adverse.`, `Se détruit.`]]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull() || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("effect", this.adversary().zone("Terrain").cards[0]);
            }
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature", undefined);
        }
    };

    useEffect = (choice: string, target: Unit | undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.specialDamage(5, this);
            this.destroy();
        }

        this.pose();
    };
};