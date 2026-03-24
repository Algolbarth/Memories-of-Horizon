import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ChapeauDeMage extends Equipment {
    name = "Chapeau de mage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.initFamily(["Armure", "Mage"]);

        this.equipStat("Magie").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente d'autant la garde du porteur que la magie de celui-ci.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Garde").fix(this.bearer.stat("Magie").value());
        }
    };
};