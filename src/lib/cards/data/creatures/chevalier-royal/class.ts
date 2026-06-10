import type { System } from '$lib/system/class';
import { Knight, MountedKnight } from '$lib/cards/class/knight';

export class ChevalierRoyal extends Knight {
    name = "Chevalier royal";
    alternative_form = "Chevalier royal (monté)";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Humain", "Chevalier"]);

        this.stat("Constitution").init(60);
        this.stat("Force").init(60);
        this.stat("Endurance").init(20);
        this.stat("Résistance").init(20);
    };
};

export class ChevalierRoyalMonte extends MountedKnight {
    name = "Chevalier royal (monté)";
    alternative_form = "Chevalier royal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 200]]);

        this.initFamily(["Humain", "Chevalier"]);

        this.stat("Constitution").init(40);
        this.stat("Force").init(100);
        this.stat("Vitesse").init(3);

        this.addText(`Quand meurt : Se réincarne en {card:Chevalier royal}.`);
    };
};