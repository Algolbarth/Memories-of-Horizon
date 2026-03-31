import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import type { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

export class PlaqueDArmure extends Item {
    name = "Plaque d'armure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText(`Quand posé : Augmente de 25 l'endurance d'une carte de famille Armure dans votre inventaire.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card.isFamily("Armure")) {
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

            for (const card of this.owner().zone("Inventaire").cards) {
                if (target == undefined && card.isFamily("Armure")) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = (target: Equipment) => {
        this.targeting(target);

        target.equipStat("Endurance").increase(25);

        this.move("Défausse");
        this.pose();
    };
};