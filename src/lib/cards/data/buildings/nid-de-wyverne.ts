import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';

export class NidDeWyverne extends Building {
    name = "Nid de wyverne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 60]]);

        this.initFamily(["Wyverne"]);

        this.stat("Constitution").init(20);

        this.addText([
            `Quand se prépare sur le terrain : Pioche 2 créature de famille Wyverne et les verrouille.`,
            `Réduit de 20 le coût de ces cartes.`]);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card instanceof Creature && card.isFamily("Wyverne")) {
                    return true;
                }
                return false;
            };
            let cards: Card[] = this.owner().draw(2, readCondition);

            for (const card of cards) {
                card.costReduce(20);
            }
        }
    };
};