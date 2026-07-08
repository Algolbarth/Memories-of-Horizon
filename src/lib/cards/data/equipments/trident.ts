import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Trident extends Equipment {
    name = "Trident";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Eau", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(25);
        this.equipStat("Percée").init(50);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur détruit une unité au combat : Stocke 5 eau.`);
    };

    killEffect = () => {
        this.owner().ressource("Eau").stock(5);
    };
};