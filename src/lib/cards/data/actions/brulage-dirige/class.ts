import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class BrulageDirige extends Action {
    name = "Brûlage dirigé";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50], ["Feu", 50]]);

        this.addText([
            `Quand posé : Augmente de 1 la taille de votre terrain.`,
            `Augmente d'autant la force de toutes les créatures sur votre terrain que la taille de votre terrain.`]);
    };

    useEffect = () => {
        this.owner().zone("Terrain").size += 1;

        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Force").increase(this.owner().zone("Terrain").size);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};