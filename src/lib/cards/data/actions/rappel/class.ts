import { Card } from '$lib/cards/class/card';
import { Unit } from '$lib/cards/class/unit';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class Rappel extends Action {
    name = "Rappel";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText([
            `Quand posé : Place sur votre pile une carte située dans votre défausse.`,
            `Si c'est une unité, fixe à 1 la santé de cette carte.`]);
    };

    canUse = () => {
        if (this.owner().zone("Défausse").cards.length > 0) {
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

            for (const card of this.owner().zone("Défausse").cards) {
                if (target == undefined) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Card) => {
        this.targeting(target);

        target.move("Pile");
        if (target instanceof Unit) {
            target.stat("Santé").init(1);
        }

        this.move("Défausse");
        this.pose();
    };
};