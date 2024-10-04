import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

class DruideDesRecifs extends Creature {
    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Eau", 25]]);
        this.familles.base.push("Druide");

        this.text = Text;
    };

    use = function () {
        this.select();
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            this.useEffect("Tortue");
        }
    };

    useEffect = function (choice) {
        if (choice == "Ondin") {
            this.transform("Druide des récifs (forme ondin)");
        }
        else if (choice == "Tortue") {
            this.transform("Druide des récifs (forme tortue)");
        }
        this.zone.cards[this.slot].move("Terrain");
        this.pose();
    };
}

export class DruideDesRecifsOndin extends DruideDesRecifs {
    name = "Druide des récifs (forme ondin)";
    otherForm = "Druide des récifs (forme tortue)";

    constructor(System) {
        super(System);

        this.familles.base.push("Ondin");
        
        this.stat("Vie").base = 30;
        this.stat("Vie").current = 30;
        this.stat("Attaque").base = 30;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.owner.ressource("Eau").max += 2;
        }
    };
}

export class DruideDesRecifsTortue extends DruideDesRecifs {
    name = "Druide des récifs (forme tortue)";
    otherForm = "Druide des récifs (forme ondin)";

    constructor(System) {
        super(System);

        this.familles.base.push("Reptile");

        this.trait("Rare").base = true;
        
        this.stat("Vie").base = 40;
        this.stat("Vie").current = 40;
        this.stat("Attaque").base = 40;
        this.stat("Défense").base = 10;
    };
}