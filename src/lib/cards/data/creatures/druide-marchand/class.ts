import type { System } from '$lib/system/class';
import { Druid } from '$lib/cards/class/druid';

class DruideMarchand extends Druid {
    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);
    };
};

export class DruideMarchandHumain extends DruideMarchand {
    name = "Druide marchand (forme humain)";
    alternative_form = "Druide marchand (forme boeuf)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand se prépare sur le terrain : Augmente de 1 votre production d'or.`);
    };

    startPhaseEffect = () => {
        this.owner().ressource("Or").increase(1);
    };
};

export class DruideMarchandBoeuf extends DruideMarchand {
    name = "Druide marchand (forme boeuf)";
    alternative_form = "Druide marchand (forme humain)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Bête"]);

        this.trait("Rare").init(true);
        this.trait("Forme animale").init(true);

        this.stat("Constitution").init(35);
        this.stat("Force").init(10);
    };
};