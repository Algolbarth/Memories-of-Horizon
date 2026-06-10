import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class TortueHydrodorsale extends Creature {
    name = "Tortue hydrodorsale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Eau", 12]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(5);
        this.stat("Garde").init(20);

        this.addText(`Quand meurt : Génère {card:Bulle protectrice} dans votre inventaire.`);
    };

    dieEffect = () => {
        this.owner().getCard("Bulle protectrice").add("Inventaire");
    };
};