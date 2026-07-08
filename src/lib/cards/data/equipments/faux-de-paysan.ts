import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class FauxDePaysan extends Equipment {
    name = "Faux de paysan";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur détruit une unité au combat : Stocke 5 or.`);
    };

    killEffect = () => {
        this.owner().ressource("Or").stock(5);
    };
};