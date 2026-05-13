import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class CasqueAPic extends Equipment {
    name = "Casque à pic";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.initFamily(["Armure"]);

        this.equipStat("Épine").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Augmente jusqu'à 15 la garde du porteur.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Garde").fix(15);
        }
    };
};