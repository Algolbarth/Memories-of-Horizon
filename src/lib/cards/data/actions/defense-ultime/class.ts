import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class DefenseUltime extends Action {
    name = "Défense ultime";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Terre", 50]]);

        this.addText([
            `Quand posé : Augmente de 250 l'endurance d'une créature sur votre terrain ayant une valeur d'étourdissement nulle pendant ce tour.`,
            `Augmente jusqu'à 1 l'étourdissement de cette créature.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Étourdissement").value() == 0) {
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
                if (target == undefined && card instanceof Creature && card.stat("Étourdissement").value() == 0) {
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

        target.stat("Endurance").turn += 250;
        target.stat("Étourdissement").fix(1);

        this.move("Défausse");
        this.pose();
    };
};