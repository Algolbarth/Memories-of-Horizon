import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

class DruideDesMontagnes extends Creature {
    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Terre", 25]]);
        this.familles.base.push("Druide");

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            this.useEffect("Ours");
        }
    };

    useEffect = function (choice) {
        if (choice == "Nain") {
            this.transform("Druide des montagnes (forme nain)");
        }
        else if (choice == "Ours") {
            this.transform("Druide des montagnes (forme ours)");
        }
        this.zone.cards[this.slot].move("Terrain");
        this.pose();
    };
}

export class DruideDesMontagnesNain extends DruideDesMontagnes {
    name = "Druide des montagnes (forme nain)";
    otherForm = "Druide des montagnes (forme ours)";

    constructor(System) {
        super(System);

        this.familles.base.push("Nain");

        this.stat("Vie").base = 25;
        this.stat("Vie").current = 25;
        this.stat("Attaque").base = 25;
        this.stat("Défense").base = 5;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.stat("Vie").add += 10;
            this.stat("Vie").current += 10;
            this.stat("Attaque").add += 10;
        }
    };
}

export class DruideDesMontagnesOurs extends DruideDesMontagnes {
    name = "Druide des montagnes (forme ours)";
    otherForm = "Druide des montagnes (forme nain)";

    constructor(System) {
        super(System);

        this.familles.base.push("Bête");

        this.trait("Rare").base = true;

        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
        this.stat("Attaque").base = 50;
    };
}