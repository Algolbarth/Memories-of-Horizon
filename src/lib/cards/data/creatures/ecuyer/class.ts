import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Text from './text.svelte';
import Use from './use.svelte';
import { Knight } from '$lib/cards/class/knight';

export class Ecuyer extends Creature {
    name = "Écuyer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.text = Text;
    };

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            for (const card of this.owner().zone("Terrain").cards) {
                if (check == false && card instanceof Knight) {
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

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Knight) {
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

    useEffect = (target: Knight | undefined) => {
        if (target != undefined) {
            this.targeting(target);

            if (target.trait("À terre").value()) {
                target.stat("Constitution").increase(30);
            }
            else {
                target.stat("Force").increase(40);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};