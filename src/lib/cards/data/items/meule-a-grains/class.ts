import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { copy } from '$lib/utils';

export class MeuleAGrains extends Item {
    name = "Meule à grains";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText([
            `Quand posé : Meule toutes les cartes sur votre pile.`,
            `Produit autant d'or que de cartes meulées.`]);
    };

    useEffect = () => {
        let value = 0;

        let stack = copy(this.owner().zone("Pile").cards);
        for (const card of stack) {
            card.mill();
            value++;
        }

        this.owner().ressource("Or").produce(value);

        this.move("Défausse");
        this.pose();
    };
};