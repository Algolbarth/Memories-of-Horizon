import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Negociant extends Creature {
    name = "Négociant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Verrouille et réduit de 10 le coût en or d'une carte sur votre pile.`);
    };

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            for (const card of this.owner().zone("Pile").cards) {
                if (check == false && card.getCost("Or").value() > 0) {
                    check = true;
                }
            }

            if (check) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect(undefined);
            }
        }
        else {
            let target = undefined;

            for (const card of this.owner().zone("Pile").cards) {
                if (target == undefined && card.getCost("Or").value() > 0) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
            else {
                this.useEffect(undefined);
            }
        }
    };

    useEffect = (target: Card | undefined) => {
        if (target != undefined) {
            this.targeting(target);

            target.getCost("Or").decrease(10);
            target.lock();
        }

        this.move("Terrain");
        this.pose();
    };
};