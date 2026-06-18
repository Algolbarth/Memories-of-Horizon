import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ChapeauDeMage extends Equipment {
    name = "Chapeau de mage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.initFamily(["Armure", "Mage"]);

        this.equipStat("Magie").init(5);
        this.equipStat("Vigueur").value = function () {
            if (this.card.bearer != undefined) {
                return this.card.bearer.stat("Magie").value();
            }
            else {
                return 0;
            }
        };

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Augmente d'autant la vigueur du porteur que le charisme du porteur.`);
    };
};