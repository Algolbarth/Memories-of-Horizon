import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Equipment } from '$lib/cards/class/equipment';

export class HacheDeBucheron extends Equipment {
    name = "Hache de bûcheron";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Nature", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Adresse").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand une unité d'élément Nature périt : Si équipé et que le porteur est sur le terrain : Augmente de 5 la force du porteur.`);
    };

    otherDieEffect = (card: Card) => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain") && card.isElement("Nature")) {
            this.bearer.stat("Force").increase(5);
        }
    };
};