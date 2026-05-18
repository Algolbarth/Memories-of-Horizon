import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';
import type { Card } from '$lib/cards/class/card';
import { Location } from '$lib/cards/class/location';

export class Boussole extends Item {
    name = "Boussole";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addChoice([
            `Pioche 1 carte pour chaque lieu dans votre région.`,
            `Pioche 1 lieu.`]);
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
            this.owner().draw(this.owner().zone("Région").cards.length);
        }
        else if (choice == "location") {
            let readCondition = (card: Card) => {
                if (card instanceof Location) {
                    return true;
                }
                return false;
            };
            this.owner().draw(1, readCondition);
        }

        this.move("Défausse");
        this.pose();
    };
};