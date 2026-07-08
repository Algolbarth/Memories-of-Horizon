import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MasqueGrimacant extends Equipment {
    name = "Masque grimaçant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.initFamily(["Armure", "Gobelin"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur détruit une unité au combat : Augmente de 1 le charisme du porteur.`);
    };

    killEffect = () => {
        this.bearer?.stat("Charisme").increase(1);
    };
};