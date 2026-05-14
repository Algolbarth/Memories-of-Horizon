import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CoiffeExtravagante extends Equipment {
    name = "Coiffe extravagante";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Armure"]);

        this.equipStat("Charisme").init(2);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente d'autant la garde du porteur que la magie de celui-ci.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Garde").fix(10 * this.bearer.stat("Charisme").value());
        }
    };
};