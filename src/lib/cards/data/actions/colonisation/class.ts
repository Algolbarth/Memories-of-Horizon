import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class Colonisation extends Action {
    name = "Colonisation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Humain"]);

        this.addText(`Remplit votre terrain d'{card:Humain}.`);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let nb_creature: number = this.owner().zone("Terrain").size - this.owner().zone("Terrain").cards.length;
        for (let i = 0; i < nb_creature; i++) {
            this.owner().getCard("Humain").add("Terrain");
        }

        this.move("Défausse");
        this.pose();
    };
};