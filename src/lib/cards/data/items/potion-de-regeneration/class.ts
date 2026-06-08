import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class PotionDeRegeneration extends Item {
    name = "Potion de régénération";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat("Infusion", 5);

        this.addText(`Quand posé : Augmente de 3 la régénération d'une créature sur votre terrain pendant ce tour pour chaque valeur d'infusion.`);
        this.addText(`[details {Augmente de {card.stat("Infusion").value() * 3} la régénération d'une créature sur votre terrain pendant ce tour.}]`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
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

        target.stat("Régénération").turn += this.stat("Infusion").value() * 3;

        this.move("Défausse");
        this.pose();
    };
};