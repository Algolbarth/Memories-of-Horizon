import type { System } from '$lib/system/class';
import { Druid } from '$lib/cards/class/druid';

class DruideDesPlaines extends Druid {
    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);
    };
};

export class DruideDesPlainesHumain extends DruideDesPlaines {
    name = "Druide des plaines (forme humain)";
    alternative_form = "Druide des plaines (forme loup)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand se prépare sur le terrain : Pioche 2 cartes.`);
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().draw(2);
        }
    };
};

export class DruideDesPlainesLoup extends DruideDesPlaines {
    name = "Druide des plaines (forme loup)";
    alternative_form = "Druide des plaines (forme humain)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Bête"]);

        this.trait("Rare").init(true);
        this.trait("Forme animale").init(true);

        this.stat("Constitution").init(10);
        this.stat("Force").init(30);
    };
};