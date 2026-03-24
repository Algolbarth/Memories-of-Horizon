import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Aventurier extends Creature {
    name = "Aventurier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addChoice([
            `Pioche 1 action.`,
            `Pioche 1 bâtiment.`,
            `Pioche 1 créature.`,
            `Pioche 1 lieu.`,
            `Pioche 1 objet.`]);
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect("Créature");
        }
    };

    useEffect = (choice: string) => {
        let nb_guild: number = 0;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card.name == "Guilde des aventuriers") {
                nb_guild++;
            }
        }

        let readCondition = (card: Card) => {
            if (card.type == choice) {
                return true;
            }
            return false;
        };
        this.owner().draw(1 + nb_guild, readCondition);

        this.move("Terrain");
        this.pose();
    };
};