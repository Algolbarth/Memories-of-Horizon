import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Juge extends Creature {
    name = "Juge";

    constructor(system: System) {
        super(system);

        this.init([["Or", 105]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Fixe le charisme d'une créature sur le terrain au plus haut charisme parmi les unités sur le terrain.`,
            `Augmente de 1 le charisme de cette créature.`]);
    };

    select = () => {
        let check = false;

        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (check == false && card instanceof Creature) {
                    check = true;
                }
            }
        }

        if (check) {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                let target = undefined;

                for (const card of this.adversary().zone("Terrain").cards) {
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
        }
        else {
            this.useEffect(undefined);
        }
    };

    useEffect = (target: Creature | undefined) => {
        if (target != undefined) {
            this.targeting(target);

            let max_charisma: number = 0;
            for (const entity of [this.owner(), this.adversary()]) {
                for (const card of entity.zone("Terrain").cards) {
                    if (card.stat("Charisme").value() > max_charisma) {
                        max_charisma = card.stat("Charisme").value();
                    }
                }
            }

            target.stat("Charisme").set(max_charisma + 1);
        }

        this.move("Terrain");
        this.pose();
    };
};