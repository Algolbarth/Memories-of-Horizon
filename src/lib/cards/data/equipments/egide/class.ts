import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Egide extends Equipment {
    name = "Égide";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Armure"]);

        this.equipStat("Endurance").value = function () {
            if (this.card.bearer != undefined) {
                return this.card.bearer.stat("Charisme").value() * 10;
            }
            else {
                return 0;
            }
        };

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Augmente l'endurance du porteur de 10 fois le charisme du porteur.`);
    };
};