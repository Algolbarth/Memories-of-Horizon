import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';

export class Palefrenier extends Creature {
    name = "Palefrenier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Génère {card:Monture de chevalier} sur votre pile.`,
            `Réduit de 40 le coût de cette carte.`]);
    };

    useEffect = () => {
        if (this.owner().zone("Pile").isNotFull()) {
            let card: Card = this.owner().getCard("Monture de chevalier");
            card.costReduce(40);
            card.add("Pile");
        }

        this.move("Terrain");
        this.pose();
    };
};