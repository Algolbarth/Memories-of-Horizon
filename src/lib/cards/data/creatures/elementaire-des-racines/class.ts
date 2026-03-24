import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ElementaireDesRacines extends Creature {
    name = "Élémentaire des racines";

    constructor(system: System) {
        super(system);

        this.init([["Végétal", 50]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand périt : Augmente la constitution et la force de la créature sur votre terrain la plus en avant de la même valeur que sa constitution et sa force.`);
    };

    perishEffect = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card != this) {
                target = card;
            }
        }

        if (target != undefined) {
            target.stat("Force").increase(this.stat("Force").value());
            target.stat("Constitution").increase(this.stat("Vitalité").value());
        }
    };
};