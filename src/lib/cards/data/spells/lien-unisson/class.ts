import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';
import { copy } from '$lib/utils';
import type { Unit } from '$lib/cards/class/unit';

export class LienDUnisson extends Spell {
    name = "Lien d'unisson";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.addText([
            `Quand posé : Augmente de 25 la constitution et la force d'une créature sur votre terrain.`,
            `[sorcery {150, Augmente de 25 la constitution et la force de toutes les créatures sur votre terrain à la place.}]`]);
    };

    canUse = () => {
        let nb_creature: number = 1;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                nb_creature++;
            }
        }
        return nb_creature > 1 || (nb_creature > 0 && this.owner().ressource("Mana").total() >= 150);
    };

    select = () => {
        if (this.owner().ressource("Mana").total() >= 150) {
            this.useEffect();
        }
        else {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                let target_1 = undefined;
                let target_2 = undefined;

                for (const card of this.owner().zone("Terrain").cards) {
                    if (card instanceof Creature) {
                        if (target_1 == undefined) {
                            target_1 = card;
                        }
                        else if (target_2 == undefined) {
                            target_2 = card;
                        }
                    }
                }

                if (target_1 != undefined && target_2 != undefined) {
                    this.useEffect(target_1, target_2);
                }
            }
        }
    };

    useEffect = (target_1: Creature | undefined = undefined, target_2: Creature | undefined = undefined) => {
        if (this.owner().ressource("Mana").total() >= 150) {
            this.owner().ressource("Mana").spend(150);

            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.stat("Constitution").increase(25);
                    card.stat("Force").increase(25);
                }
            }
        }
        else if (target_1 != undefined && target_2 != undefined) {
            this.targeting(target_1);
            this.targeting(target_2);

            for (const target of [target_1, target_2]) {
                target.stat("Constitution").increase(25);
                target.stat("Force").increase(25);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};