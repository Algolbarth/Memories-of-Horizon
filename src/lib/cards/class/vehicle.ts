import type { System } from '$lib/system/class';
import { Building } from './building';

export class Vehicle extends Building {
    constructor(system: System) {
        super(system);

        this.initFamily(["Véhicule"]);

        this.stat("Initiative").init(1);
        this.stat("Maîtrise").init(1);
    };
};