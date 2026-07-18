import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';

export class PassageSecret extends Building {
    name = "Passage secret";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.stat("Constitution").init(20);

        this.addStat(601, "Évadés", 2);

        this.addText([
            `Quand une autre créature alliée est vendue : Si sur le terrain : Augmente de 1 ses évadés.`,
            `Augmente de 5 sa vente en or.`]);
        this.addText(`Quand vendu : Pioche autant de créature que ses évadés.`);
    };

    otherSellEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card) && card instanceof Creature) {
            this.stat("Évadés").increase(1);

            this.getSale("Or").increase(5);
        }
    };

    sellEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature) {
                return true;
            }
            return false;
        };
        this.owner().draw(this.stat("Évadés").value(), readCondition);
    };
};