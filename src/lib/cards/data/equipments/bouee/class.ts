import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Bouee extends Equipment {
    name = "Bouée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Eau", 5]]);

        this.equipElements = ["Eau"];

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Le porteur est d'élément Eau.`);
    };
};