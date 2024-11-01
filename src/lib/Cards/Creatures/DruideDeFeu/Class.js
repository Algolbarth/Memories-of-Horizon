import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

class DruideDeFeu extends Creature {
    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Feu", 25]]);
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
            this.useEffect("Gobelin");
        }
    };

    useEffect = function (choice) {
        if (choice == "Gobelin") {
            this.transform("Druide de feu (forme gobelin)");
        }
        else if (choice == "Lézard") {
            this.transform("Druide de feu (forme lézard)");
        }
        this.zone.cards[this.slot].move("Terrain");
        this.pose();
    };
}

export class DruideDeFeuGobelin extends DruideDeFeu {
    name = "Druide de feu (forme gobelin)";
    otherForm = "Druide de feu (forme lézard)";

    constructor(System) {
        super(System);

        this.familles.base.push("Gobelin");

        this.stat("Vie").base = 40;
        this.stat("Vie").current = 40;
        this.stat("Attaque").base = 40;
    };

    startStepEffect = function () {
        if (this.zone.name == "Terrain") {
            this.stat("Attaque").add += 10;
        }
    };
}

export class DruideDeFeuLezard extends DruideDeFeu {
    name = "Druide de feu (forme lézard)";
    otherForm = "Druide de feu (forme gobelin)";

    constructor(System) {
        super(System);

        this.familles.base.push("Reptile");

        this.trait("Rare").base = true;

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;
        this.stat("Adresse").base = 20;
    };
}