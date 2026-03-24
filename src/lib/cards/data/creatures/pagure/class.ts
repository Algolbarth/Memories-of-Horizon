import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class Pagure extends Creature {
    name = "Pagure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Eau", 15]]);

        this.stat("Constitution").init(2);
        this.stat("Force").init(2);
        this.stat("Endurance").init(3);

        this.addChoice([
            `Génère {card:Coquillage} dans votre inventaire.`,
            `Génère {card:Conque} dans votre inventaire.`]);
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect("Conque");
        }
    };

    useEffect = (choice: string) => {
        this.owner().getCard(choice).add("Inventaire");

        this.move("Terrain");
        this.pose();
    };
};