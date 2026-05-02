import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class ElementaireDeFeuilles extends Creature {
    name = "Élémentaire de feuilles";

    constructor(system: System) {
        super(system);

        this.init([["Nature", 15]]);

        this.initFamily(["Élémentaire", "Plante"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);

        this.addChoice([
            `Se place sur votre terrain.`,
            `Éveil : Augmente de 15 sa force et sa constitution.`,
        ]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull() || this.owner().zone("Pile").isNotFull()) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            if (this.owner().zone("Terrain").isNotFull() && this.owner().zone("Pile").isNotFull()) {
                this.system.game.use.set(this, Use);
            }
            else if (this.owner().zone("Terrain").isNotFull()) {
                this.useEffect("battlefield");
            }
            else if (this.owner().zone("Pile").isNotFull()) {
                this.useEffect("stack");
            }
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("battlefield");
        }
    };

    useEffect = (choice: string) => {
        if (choice == "battlefield") {
            this.move("Terrain");
        }
        else if (choice == "stack") {
            this.stat("Constitution").increase(15);
            this.stat("Force").increase(15);

            this.stat("Éveil").increase(1);

            this.move("Pile");
        }

        this.pose();
    };
};