import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';
import type { Unit } from '$lib/cards/class/unit';

export class CerclesMagiques extends Action {
    name = "Cercles magiques";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Augmente de 10 la magie d'une unité sur votre terrain pendant ce tour.`);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect(this.owner().zone("Terrain").cards[0]);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Magie").turn += 10;

        this.move("Défausse");
        this.pose();
    };
};