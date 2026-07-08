import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class Bourse extends Item {
    name = "Bourse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.getSale("Or").base = 0;

        this.addText(`Quand se prépare dans l'inventaire : Augmente de 5 sa vente en or.`);
    };

    canUse = () => {
        return false;
    };

    startPhaseEffect = () => {
        if (this.isArea("Inventaire")) {
            this.getSale("Or").increase(5);
        }
    };
};