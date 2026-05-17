import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Action } from '$lib/cards/class/action';
import { Equipment } from '$lib/cards/class/equipment';

export class Encyclopedie extends Equipment {
    name = "Encyclopédie";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Livre"]);

        this.equipStat("Intelligence").init(2);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur se prépare sur le terrain : Pioche 1 action.`);
    };

    startPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            let readCondition = (card: Card) => {
                if (card instanceof Action) {
                    return true;
                }
                return false;
            };
            this.owner().draw(1, readCondition);
        }
    };
};