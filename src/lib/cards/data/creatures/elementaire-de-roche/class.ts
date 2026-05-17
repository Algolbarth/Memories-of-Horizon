import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';
import type { Unit } from '$lib/cards/class/unit';

export class ElementaireDeRoche extends Creature {
    name = "Élémentaire de roche";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 60]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(40);
        this.stat("Force").init(40);
        this.stat("Endurance").init(10);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Inflige 5 dégâts spéciaux à toutes les unités sur le terrain adverse.`, `Se détruit.`]]);
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
                this.useEffect("effect");
            }
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature");
        }
    };

    useEffect = (choice: string) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect") {
            let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(5, this);
            }
            this.destroy();
        }

        this.pose();
    };
};