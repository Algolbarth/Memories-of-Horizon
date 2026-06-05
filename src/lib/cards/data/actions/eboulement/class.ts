import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { Building } from '$lib/cards/class/building';
import Use from './use.svelte';

export class Eboulement extends Action {
    name = "Éboulement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.addText([
            `Quand posé : Augmente jusqu'à 1 l'étourdissement d'une créature sur le terrain adverse.`,
            `Si cette créature est étourdie, lui inflige 50 dégâts spéciaux à la place.`]);
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
            let target = undefined;

            for (const card of this.adversary().zone("Terrain").cards) {
                if (target == undefined) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        if (target instanceof Building && target.stat("Étourdissement").value() >= 1) {
            target.specialDamage(50, this);
        }
        else {
            target.stat("Étourdissement").fix(1);
        }

        this.move("Défausse");
        this.pose();
    };
};