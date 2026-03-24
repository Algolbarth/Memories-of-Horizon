import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import Use from './use.svelte';

export class Option extends Action {
    name = "Option";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.addChoice([
            `Pioche 3 cartes.`,
            `Découvre 1 carte.`]);
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect("draw");
        }
    };

    useEffect = (choice: string) => {
        if (choice == "draw") {
            this.owner().draw(3);
        }
        else if (choice == "discover") {
            this.owner().discover(1);
        }

        this.move("Défausse");
        this.pose();
    };
};