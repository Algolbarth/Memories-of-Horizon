import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Dresseur extends Creature {
    name = "Dresseur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Végétal", 10]]);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Pioche 1 créature de famille Bête.`,
            `Augmente de 20 la constitution et la force de cette créature.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Bête")) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].stat("Constitution").increase(20);
            cards[0].stat("Force").increase(20);
        }

        this.move("Terrain");
        this.pose();
    };
};