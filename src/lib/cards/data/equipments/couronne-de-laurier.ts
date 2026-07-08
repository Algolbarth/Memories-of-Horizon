import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CouronneDeLaurier extends Equipment {
    name = "Couronne de laurier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Nature", 25]]);

        this.equipStat("Charisme").init(2);
        this.equipStat("Intelligence").value = function () {
            if (this.card.bearer != undefined) {
                return 2 * this.card.bearer.stat("Charisme").value();
            }
            else {
                return 0;
            }
        };

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Augmente d'autant l'intelligence du porteur que 2 fois le charisme du porteur.`);
    };
};