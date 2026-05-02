import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Action } from '$lib/cards/class/action';
import { Druid } from '$lib/cards/class/druid';

class DruideDesBois extends Druid {
    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);
    };
};

export class DruideDesBoisElfe extends DruideDesBois {
    name = "Druide des bois (forme elfe)";
    alternative_form = "Druide des bois (forme renard)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Elfe"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);

        this.addText(`Quand une action alliée est posée : Si sur le terrain : Augmente de 6 sa constitution.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isAlly(card) && card instanceof Action) {
            this.stat("Constitution").increase(6);
        }
    };
};

export class DruideDesBoisRenard extends DruideDesBois {
    name = "Druide des bois (forme renard)";
    alternative_form = "Druide des bois (forme elfe)";

    constructor(system: System) {
        super(system);

        this.initFamily(["Bête"]);

        this.trait("Rare").init(true);
        this.trait("Forme animale").init(true);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);
        this.stat("Intelligence").init(5);
    };
};