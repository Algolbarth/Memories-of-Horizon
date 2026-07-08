import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class Louveteau extends Creature {
    name = "Louveteau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 4]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(5);
    };
};