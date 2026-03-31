import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

export class EventailDeCouteaux extends Equipment {
    name = "Éventail de couteaux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(30);

        this.addChoice([
            `S'équipe à une créature sur votre terrain.`,
            `Inflige 3 dégâts spéciaux à toutes les unités sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.canEquip()) {
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

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature && card.canEquip()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect("equip", target);
                return 0;
            }

            if (this.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect("damage", undefined);
            }
        }
    };

    useEffect = (choice: string, target: Creature | undefined) => {
        this.targeting(target);

        if (choice == "equip") {
            target.equip(this);
        }
        else if (choice == "damage") {
            let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(3, this);
            }
            this.move("Défausse");
        }

        this.pose();
    };
};