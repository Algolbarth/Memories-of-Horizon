import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Incantation extends Action {
    name = "Incantation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText([
            `Quand posé : Produit autant de mana que la magie d'une créature sur votre terrain ayant une valeur d'étourdissement nulle.`,
            `Augmente jusqu'à 1 l'étourdissement de cette créature.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Magie").value() > 0 && card.stat("Étourdissement").value() == 0) {
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
                if (target == undefined && card instanceof Creature && card.stat("Magie").value() > 0 && card.stat("Étourdissement").value() == 0) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        this.owner().ressource("Mana").produce(target.stat("Magie").value());
        target.stat("Étourdissement").fix(1);

        this.move("Défausse");
        this.pose();
    };
};