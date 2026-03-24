import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MasseDePierre extends Equipment {
    name = "Masse de pierre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(10);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Augmente de 5 l'endurance du porteur.`);
    };

    fightEffect = () => {
        this.bearer.stat("Endurance").increase(5);
    };
};