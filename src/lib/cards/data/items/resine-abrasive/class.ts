import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';
import { Item } from '$lib/cards/class/item';

export class ResineAbrasive extends Item {
    name = "Résine abrasive";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Augmente de 20 l'adresse d'un objet de famille Arme dans votre inventaire.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card instanceof Equipment && card.isFamily("Arme")) {
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
                if (target == undefined && card instanceof Equipment && card.isFamily("Arme")) {
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

        target.equipStat("Adresse").increase(20);

        this.move("Défausse");
        this.pose();
    };
};