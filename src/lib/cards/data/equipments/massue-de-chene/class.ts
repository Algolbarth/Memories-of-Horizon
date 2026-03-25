import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MassueDeChene extends Equipment {
    name = "Massue de chêne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Végétal", 18]]);

        this.initFamily(["Arme"]);

        this.equipStat("Constitution").init(15);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Augmente de 10 la constitution du porteur.`);
    };

    fightEffect = () => {
        this.bearer.stat("Constitution").increase(10);
    };
};