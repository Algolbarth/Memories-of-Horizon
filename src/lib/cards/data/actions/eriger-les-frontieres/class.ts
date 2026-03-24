import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';

export class ErigerLesFrontieres extends Action {
    name = "Ériger les frontières";

    constructor(system: System) {
        super(system);

        this.init([["Or", 75], ["Terre", 75]]);

        this.addText([
            `Quand posé : Augmente de 1 la taille de votre terrain.`,
            `Augmente d'autant l'endurance de toutes les unités sur le terrain adverse que la taille de votre terrain.`]);
    };

    useEffect = () => {
        this.owner().zone("Terrain").size += 1;

        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            card.stat("Endurance").increase(this.owner().zone("Terrain").size);
        }

        this.move("Défausse");
        this.pose();
    };
};