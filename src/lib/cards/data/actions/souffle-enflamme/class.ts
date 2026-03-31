import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class SouffleEnflamme extends Action {
    name = "Souffle enflammé";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.addText(`Quand posé : Inflige 20 dégâts spéciaux à une unité sur le terrain adverse et aux unités adjacentes de cette unité.`);
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

        target.specialDamage(20, this);
        if (target.slot != undefined && target.zone) {
            if (target.slot > 0) {
                target.zone.cards[target.slot - 1].specialDamage(20, this);
            }
            if (target.slot < target.zone.cards.length - 1) {
                target.zone.cards[target.slot + 1].specialDamage(20, this);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};