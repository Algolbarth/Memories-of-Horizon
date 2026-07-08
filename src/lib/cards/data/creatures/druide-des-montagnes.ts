import type { System } from '$lib/system/class';
import { Druid } from '$lib/cards/class/druid';

class DruideDesMontagnes extends Druid {
    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Terre", 30]]);
    };
};

export class DruideDesMontagnesNain extends DruideDesMontagnes {
    name = "Druide des montagnes (forme nain)";
    alternative_form = "Druide des montagnes (forme ours)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Endurance").init(10);

        this.addText(`Quand se prépare sur le terrain : Augmente de 10 sa constitution et sa force.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);
        }
    };
};

export class DruideDesMontagnesOurs extends DruideDesMontagnes {
    name = "Druide des montagnes (forme ours)";
    alternative_form = "Druide des montagnes (forme nain)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Bête"]);

        this.trait("Rare").init(true);
        this.trait("Forme animale").init(true);

        this.stat("Constitution").init(50);
        this.stat("Force").init(50);
    };
};