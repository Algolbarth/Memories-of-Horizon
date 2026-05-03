import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Consul extends Creature {
    name = "Consul";

    constructor(system: System) {
        super(system);

        this.init([["Or", 55], ["Eau", 55]]);

        this.initFamily(["Ondin", "Commandant"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText([
            `Quand posé : Augmente de 5 la constitution et la force de toutes les créatures sur votre terrain.`,
            `Produit 5 eau pour chaque créature sur votre terrain.`]);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                this.owner().ressource("Eau").produce(5);

                card.stat("Constitution").increase(5);
                card.stat("Force").increase(5);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};