import type { System } from '$lib/system/class';
import { Knight, MountedKnight } from '$lib/cards/class/knight';

export class ChevalierDElite extends Knight {
    name = "Chevalier d'élite";
    alternative_form = "Chevalier d'élite (monté)";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Humain", "Chevalier"]);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);
        this.stat("Endurance").init(10);
        this.stat("Résistance").init(10);
    };
};

export class ChevalierDEliteMonte extends MountedKnight {
    name = "Chevalier d'élite (monté)";
    alternative_form = "Chevalier d'élite";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Humain", "Chevalier"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(40);
        this.stat("Vitesse").init(2);

        this.addText(`Quand meurt : Se réincarne en {card:Chevalier d'élite}.`);
    };
};