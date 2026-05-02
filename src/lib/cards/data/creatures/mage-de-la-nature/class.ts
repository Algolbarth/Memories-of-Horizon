import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class MageDeLaNature extends Creature {
    name = "Mage de la nature";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Nature", 20]]);

        this.initFamily(["Elfe", "Mage"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);
        this.stat("Magie").init(5);

        this.addText(`Quand une carte alliée de famille Sort est posée : Si sur le terrain : Pioche 1 créature du même niveau que ce sort.`);
    };

    otherPoseEffect = (c: Card) => {
        if (this.isArea("Terrain") && c.isFamily("Sort") && this.isAlly(c)) {
            let readCondition = (card: Card) => {
                if (card instanceof Creature && c.level == card.level) {
                    return true;
                }
                return false;
            };
            this.owner().draw(1, readCondition);
        }
    };
};