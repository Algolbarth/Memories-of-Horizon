import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';

export class PeauDOurs extends Equipment {
    name = "Peau d'ours";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.initFamily(["Armure", "Bête"]);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand une créature alliée de famille Bête périt : Si équipé et que le porteur est sur le terrain : Augmente de 15 la constitution du porteur.`);
    };

    otherDieEffect = (card: Card) => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain") && card instanceof Creature && this.bearer.isAlly(card) && card.isFamily("Bête")) {
            this.bearer.stat("Constitution").increase(15);
        }
    };
};