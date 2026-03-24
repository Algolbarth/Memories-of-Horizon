import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Equipment } from '$lib/cards/class/equipment';

export class Pelle extends Equipment {
    name = "Pelle";

    constructor(system: System) {
        super(system);

        this.init([["Or", 18], ["Terre", 18]]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Découvre 1 carte d'élément Terre et produit 10 terre.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card.isElement("Terre")) {
                    return true;
                }
                return false;
            };
            this.owner().discover(1, readCondition);

            this.owner().ressource("Terre").produce(10);
        }
    };
};