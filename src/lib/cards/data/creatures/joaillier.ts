import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Item } from '$lib/cards/class/item';

export class Joaillier extends Creature {
    name = "Joaillier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand se prépare sur le terrain : Pioche 1 objet de famille Joyau.`,
            `Convertit en or le coût de cet objet.`]);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card instanceof Item && card.isFamily("Joyau")) {
                    return true;
                }
                return false;
            };
            let cards: Card[] = this.owner().draw(1, readCondition);
            for (const card of cards) {
                for (const cost of card.cost) {
                    if (cost.name != "Or" && cost.value() > 0) {
                        card.getCost("Or").add += cost.value();
                        cost.fix(0);
                    }
                }
            }
        }
    };
};