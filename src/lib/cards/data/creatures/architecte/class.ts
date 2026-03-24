import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Building } from '$lib/cards/class/building';
import { Creature } from '$lib/cards/class/creature';

export class Architecte extends Creature {
    name = "Architecte";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Terre", 10]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(3);

        this.addText([
            `Quand posé : Pioche 1 bâtiment.`,
            `Augmente de 20 la constitution de ce bâtiment.`]);
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Building) {
                return true;
            }
            return false;
        };
        let cards = this.owner().draw(1, readCondition);

        if (cards[0] != undefined) {
            cards[0].stat("Constitution").increase(20);
        }

        this.move("Terrain");
        this.pose();
    };
};