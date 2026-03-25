import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class MageDesEaux extends Creature {
    name = "Mage des eaux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Eau", 12]]);

        this.initFamily(["Ondin", "Mage"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Magie").init(10);

        this.addText([
            `Quand se prépare sur le terrain : Pioche 1 carte de famille Sort.`,
            `[sorcery {5, réduit de 10 le coût de cette carte.}]`]);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card.isFamily("Sort")) {
                    return true;
                }
                return false;
            };

            let cards = this.owner().draw(1, readCondition);

            if (cards[0] != undefined && this.owner().ressource("Mana").total() >= 5) {
                this.owner().ressource("Mana").spend(5);
                cards[0].costReduce(10);
            }
        }
    };
};