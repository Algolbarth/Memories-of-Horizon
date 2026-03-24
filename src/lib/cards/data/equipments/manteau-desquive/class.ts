import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class ManteauDEsquive extends Equipment {
    name = "Manteau d'esquive";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Armure"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Au début d'une manche : Si équipé et que le porteur est sur le terrain : Augmente de 1 l'esquive du porteur pendant cette manche.`);
    };

    roundEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Esquive").round += 1;
        }
    };
};