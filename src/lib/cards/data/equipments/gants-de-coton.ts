import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class GantsDeCoton extends Equipment {
    name = "Gants de coton";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Armure"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Au début de la phase de combat : Si équipé et que le porteur est sur le terrain : Augmente de 1 l'initiative du porteur pendant ce tour.`);
    };

    startBattleEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Initiative").turn += 1;
        }
    };
};