import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class PetiteFille extends Creature {
    name = "Petite fille";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(1);
        this.stat("Force").init(1);

        this.addText(`Quand posé : Augmente de 1 le charisme d'une créature sur votre terrain.`);
    };

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            for (const card of this.owner().zone("Terrain").cards) {
                if (check == false && card instanceof Creature) {
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
                if (target == undefined && card instanceof Creature) {
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

    useEffect = (target: Creature) => {
        if (target != undefined) {
            this.targeting(target);

            target.stat("Charisme").increase(1);
        }

        this.move("Terrain");
        this.pose();
    };
};