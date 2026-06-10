import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Equipment } from '$lib/cards/class/equipment';

export class Alchimanach extends Equipment {
    name = "Alchimanach";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText([
            `Quand le porteur se prépare sur le terrain : Pioche 1 carte de famille Potion.`,
            `Augmente de 15 l'infusion de cette carte.`]);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card.isFamily("Potion")) {
                    return true;
                }
                return false;
            };
            let cards: Card[] = this.owner().draw(1, readCondition);

            if (cards[0] != undefined) {
                cards[0].stat("Infusion").increase(15);
            }
        }
    };
};