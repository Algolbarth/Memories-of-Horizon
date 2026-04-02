import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';

export class NidDeWyverne extends Building {
    name = "Nid de wyverne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Wyverne"]);

        this.stat("Constitution").init(10);

        this.addText([
            `Quand se prépare sur le terrain : Pioche 1 créature de famille Wyverne et la verrouille.`,
            `Réduit de 15 le coût de cette carte.`]);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card instanceof Creature && card.isFamily("Wyverne")) {
                    return true;
                }
                return false;
            };
            let cards = this.owner().draw(1, readCondition);

            if (cards[0] != undefined) {
                cards[0].costReduce(15);
                cards[0].lock();
            }
        }
    };
};