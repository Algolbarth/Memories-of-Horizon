import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class TortueGéante extends Creature {
    name = "Tortue géante";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.initFamily(["Reptile"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(5);
        this.stat("Endurance").init(5);

        this.addText(`Quand meurt : Génère {card:Carapace de tortue} dans votre inventaire.`);
    };

    dieEffect = () => {
        this.owner().getCard("Carapace de tortue").add("Inventaire");
    };
};