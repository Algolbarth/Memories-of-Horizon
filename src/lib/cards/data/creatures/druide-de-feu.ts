import type { System } from '$lib/system/class';
import { Druid } from '$lib/cards/class/druid';

class DruideDeFeu extends Druid {
    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Feu", 30]]);
    };
};

export class DruideDeFeuGobelin extends DruideDeFeu {
    name = "Druide de feu (forme gobelin)";
    alternative_form = "Druide de feu (forme taureau)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand se prépare sur le terrain : Augmente de 50 sa jauge critique.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Critique").increase(50);
            if (this.stat("Critique").value() > 100) {
                this.stat("Critique").set(100);
            }
        }
    };
};

export class DruideDeFeuTaureau extends DruideDeFeu {
    name = "Druide de feu (forme taureau)";
    alternative_form = "Druide de feu (forme taureau)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Bête"]);

        this.trait("Rare").init(true);
        this.trait("Forme animale").init(true);

        this.stat("Constitution").init(30);
        this.stat("Force").init(30);
        this.stat("Intensité").init(2);
    };
};