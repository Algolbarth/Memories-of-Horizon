import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CoiffeExtravagante extends Equipment {
    name = "Coiffe extravagante";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Armure"]);

        this.equipStat("Charisme").init(2);
        this.equipStat("Vigueur").value = function () {
            if (this.card.bearer != undefined) {
                return this.card.bearer.stat("Charisme").value() * 10;
            }
            else {
                return 0;
            }
        };

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Augmente d'autant la vigueur du porteur que 10 fois le charisme du porteur.`);
    };
};