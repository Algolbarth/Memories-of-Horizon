import type { System } from '$lib/system/class';
import { Knight, MountedKnight } from '$lib/cards/class/knight';

export class ChevalierGeant extends Knight {
    name = "Chevalier géant";
    alternative_form = "Chevalier géant (monté)";

    constructor(system: System) {
        super(system);

        this.init([["Or", 150]]);

        this.initFamily(["Géant", "Chevalier"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(100);
        this.stat("Endurance").init(25);
        this.stat("Résistance").init(25);
    };
};

export class ChevalierGeantMonte extends MountedKnight {
    name = "Chevalier géant (monté)";
    alternative_form = "Chevalier géant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 300]]);

        this.initFamily(["Géant", "Chevalier"]);

        this.stat("Constitution").init(50);
        this.stat("Force").init(150);
        this.stat("Vitesse").init(5);

        this.addText(`Quand périt : Se réincarne en {card:Chevalier géant}.`);
    };
};