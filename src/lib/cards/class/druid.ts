import type { System } from "$lib/system/class";
import Use from '../utils/druid-use.svelte';
import { Creature } from "./creature";

export class Druid extends Creature {
    alternative_form: string = "";

    constructor(system: System) {
        super(system);

        this.initFamily(["Druide"]);

        this.addTrait("Forme animale", false);

        this.addTrait("Forme druidique", false);
        this.trait("Forme druidique").value = function () {
            return !this.card.trait("Forme animale").value();
        };

        this.addChoice([
            `Se place sur votre terrain.`,
            `Se transforme en {card:{card.alternative_form}} et se place sur votre terrain.`]);
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            this.useEffect("place");
        }
    };

    useEffect = (choice: string) => {
        if (choice == "transform") {
            this.transform(this.alternative_form);

            this.area().cards[this.emplacement()].move("Terrain");
            this.area().cards[this.emplacement()].pose();
        }
        else if (choice == "place") {
            this.move("Terrain");
            this.pose();
        }
    };
};