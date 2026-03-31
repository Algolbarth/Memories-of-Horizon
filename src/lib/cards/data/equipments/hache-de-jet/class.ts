import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

export class HacheDeJet extends Equipment {
    name = "Hache de jet";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Arme"]);

        this.equipStat("Adresse").init(25);

        this.addChoice([
            `S'équipe à une créature sur votre terrain.`,
            `Inflige 50 dégâts spéciaux à une unité sur le terrain adverse.`]);
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
                this.useEffect(target, "equip");
                return 0;
            }

            if (this.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.adversary().zone("Terrain").cards[0], "damage");
            }
        }
    };

    useEffect = (target: Unit, choice: string) => {
        this.targeting(target);

        if (choice == "equip") {
            target.equip(this);
        }
        else if (choice == "damage") {
            target.specialDamage(50, this);
            this.move("Défausse");
        }

        this.pose();
    };
};