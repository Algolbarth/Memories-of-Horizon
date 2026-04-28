import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';

export class Bestiaire extends Item {
    name = "Bestiaire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            "Quand posé : Découvre 3 créatures.",
            "[resolve {20, Découvre 5 créatures à la place.}]"]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature) {
                return true;
            }
            return false;
        };

        if (this.owner().totalIntelligence() >= 20) {
            this.owner().discover(5, readCondition);
        }
        else {
            this.owner().discover(3, readCondition);
        }

        this.move("Défausse");
        this.pose();
    };
};