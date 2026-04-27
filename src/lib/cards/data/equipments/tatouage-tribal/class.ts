import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class TatouageTribal extends Equipment {
    name = "Tatouage tribal";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.equipStat("Force").value = function () {
            if (this.card.bearer != undefined) {
                return this.card.bearer.stat("Charisme").value() * 20;
            }
            else {
                return 0;
            }
        };

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Augmente d'autant la force du porteur que 20 fois le charisme du porteur.`);
    };
};