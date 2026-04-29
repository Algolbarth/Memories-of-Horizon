import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

export class ElementaireDeRacines extends Creature {
    name = "Élémentaire de racines";

    constructor(system: System) {
        super(system);

        this.init([["Végétal", 50]]);

        this.initFamily(["Élémentaire", "Plante"]);

        this.stat("Constitution").init(20);
        this.stat("Force").init(20);
        this.stat("Régénération").init(20);

        this.addChoice([
            `Se place sur votre terrain.`,
            `Éveil : Augmente de 15 sa constitution et sa régénération.`,
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
            this.stat("Régénération").increase(15);

            this.stat("Éveil").increase(1);

            this.move("Pile");
        }

        this.pose();
    };
};