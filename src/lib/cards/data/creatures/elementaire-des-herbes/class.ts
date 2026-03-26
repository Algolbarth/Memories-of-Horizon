import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDesHerbes extends Creature {
    name = "Élémentaire des herbes";

    constructor(system: System) {
        super(system);

        this.init([["Végétal", 15]]);

        this.initFamily(["Élémentaire", "Plante"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand périt : Augmente de 15 la constitution et la force de la créature sur votre terrain la plus en avant.`);
    };

    perishEffect = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card != this) {
                target = card;
            }
        }

        if (target != undefined) {
            target.stat("Force").increase(15);
            target.stat("Constitution").increase(15);
        }
    };
};