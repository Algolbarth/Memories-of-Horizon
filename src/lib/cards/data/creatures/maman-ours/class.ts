import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class MamanOurs extends Creature {
    name = "Maman ours";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Terre", 30]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);
        this.stat("Endurance").init(10);
        this.stat("Charisme").init(1);

        this.addText(`Quand périt : Génère {card:Ourson} sur votre terrain.`);
    };

    perishEffect = () => {
        this.owner().getCard("Ourson").add("Terrain");
        this.owner().getCard("Ourson").add("Terrain");
    };
};