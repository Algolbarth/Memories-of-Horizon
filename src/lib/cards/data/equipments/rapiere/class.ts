import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Rapiere extends Equipment {
    name = "Rapière";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Arme"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Au début de la phase de combat : Si équipé et que le porteur est sur le terrain : Remplit la jauge critique du porteur.`);
    };

    startBattleEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Critique").set(100);
        }
    };
};