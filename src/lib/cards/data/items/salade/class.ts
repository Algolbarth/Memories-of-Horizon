import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Salade extends Item {
    name = "Salade";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Nature", 20]]);

        this.initFamily(["Nourriture", "Plante"]);

        this.addText([
            "Quand posé : Soigne 10 blessures à une créature sur votre terrain pour chaque carte de familles Nourriture et Plante dans votre défausse.",
            "[satiety {Augmente de 5 la constitution et la force de cette créature pour chaque carte de familles Nourriture et Plante dans votre défausse à la place.}]"]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFullLife()) {
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
                if (target == undefined && card instanceof Creature) {
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

        let nb_food: number = 0;

        let defausse = copy(this.owner().zone("Défausse").cards);
        for (const card of defausse) {
            if (card.isFamily("Nourriture") && card.isFamily("Plante")) {
                nb_food++;
            }
        }

        if (!target.isDamaged()) {
            target.stat("Constitution").increase(5 * nb_food);
            target.stat("Force").increase(5 * nb_food);
        }
        else {
            target.heal(10 * nb_food);
        }

        this.move("Défausse");
        this.pose();
    };
};