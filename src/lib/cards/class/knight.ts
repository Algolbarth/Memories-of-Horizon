import type { System } from "$lib/system/class";
import { Creature } from "./creature";

export class Knight extends Creature {
    alternative_form: string = "";

    constructor(system: System) {
        super(system);

        this.addTrait("En selle", false);

        this.addTrait("À terre", false);
        this.trait("À terre").value = function () {
            return !this.card.trait("En selle").value();
        };
    };
};

export class MountedKnight extends Knight {
    constructor(system: System) {
        super(system);

        this.trait("En selle").init(true);
    };

    dieEffect = () => {
        this.reincarnate(this.alternative_form);
    };
};