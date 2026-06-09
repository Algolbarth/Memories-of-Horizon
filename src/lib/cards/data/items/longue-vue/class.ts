import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class LongueVue extends Item {
    name = "Longue-vue";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText([
            `Quand posé : Pioche 1 carte.`,
            `Augmente de 20 la perception de cette carte.`]);
    };

    useEffect = () => {
        let cards = this.owner().draw(1);
        if (cards[0] != undefined) {
            cards[0].lock();
            cards[0].stat("Perception").increase(20);
        }

        this.move("Défausse");
        this.pose();
    };
};