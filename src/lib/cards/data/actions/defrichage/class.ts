import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';

export class Defrichage extends Action {
    name = "Défrichage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 62], ["Végétal", 62]]);

        this.addText([
            `Quand posé : Augmente de 1 la taille de votre terrain.`,
            `Augmente d'autant la constitution de toutes les créatures sur votre terrain que la taille de votre terrain.`]);
    };

    useEffect = () => {
        this.owner().zone("Terrain").size += 1;

        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                card.stat("Constitution").increase(this.owner().zone("Terrain").size);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};