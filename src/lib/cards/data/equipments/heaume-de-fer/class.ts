import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class HeaumeDeFer extends Equipment {
    name = "Heaume de fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Armure"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente jusqu'à 25 la garde du porteur.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Garde").fix(25);
        }
    };
};