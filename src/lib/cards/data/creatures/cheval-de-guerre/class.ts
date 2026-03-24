import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class ChevalDeGuerre extends Creature {
    name = "Cheval de guerre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);
        this.stat("Vitesse").init(1);

        this.addText(`Quand posé : Augmente de 10 la constitution et la force, de 1 la vitesse d'une créature sur votre terrain.`);
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

    useEffect = (target: Creature | undefined) => {
        if (target != undefined) {
            this.targeting(target);

            target.stat("Constitution").increase(10);
            target.stat("Force").increase(10);
            target.stat("Vitesse").increase(1);
        }

        this.move("Terrain");
        this.pose();
    };
};