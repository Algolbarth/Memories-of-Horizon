import type { System } from '$lib/system/class';
import { Creature } from './creature';

export class Boss extends Creature {
    constructor(system: System) {
        super(system);

        this.trait("Légendaire").init(true);
        this.trait("Boss").init(true);
    };
};