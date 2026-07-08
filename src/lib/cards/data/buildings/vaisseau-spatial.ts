import type { System } from '$lib/system/class';
import { Vehicle } from '$lib/cards/class/vehicle';

export class VaisseauSpatial extends Vehicle {
    name = "Vaisseau spatial";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.initFamily(["Spatial"]);

        this.stat("Constitution").init(40);

        this.addText(`Quand joue : Stocke 1 flux.`);
    };

    playEffect = () => {
        this.owner().ressource("Flux").stock(1);
    };
};