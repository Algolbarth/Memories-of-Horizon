import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

export class DagueEmpoisonnee extends Equipment {
    name = "Dague empoisonnée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35]]);

        this.initFamily(["Arme"]);

        this.addChoice([
            `S'équipe à une créature sur votre terrain.`,
            `Augmente de 5 le poison et augmente de 15 la toxicité d'une créature sur le terrain adverse.`]);
        this.addText(`Quand le porteur attaque une créature : Augmente de 5 la toxicité de la créature attaquée.`);
    };

    canUse = () => {
        for (const card of this.owner().adversary().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
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

            for (const card of this.owner().adversary().zone("Terrain").cards) {
                if (card instanceof Creature) {

                }
            }
        }
    };

    useEffect = (target: Unit, choice: string) => {
        this.targeting(target);

        if (choice == "equip" && target instanceof Creature) {
            target.equip(this);
        }
        else if (choice == "damage") {
            target.stat("Poison").increase(5);
            target.stat("Toxicité").increase(15);
            this.move("Défausse");
        }

        this.pose();
    };

    fightEffect = (defender: Unit) => {
        if (defender instanceof Creature) {
            defender.stat("Toxicité").increase(5);
        }
    };
};