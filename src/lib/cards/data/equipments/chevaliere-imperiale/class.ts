import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ChevaliereImperiale extends Equipment {
    name = "Chevalière impériale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.equipElements = ["Neutre"];

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Le porteur est d'élément Neutre.`);
    };
};