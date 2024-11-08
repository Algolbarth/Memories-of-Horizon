import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

class DruideMarchand extends Creature {
    constructor(System) {
        super(System);

        this.init([["Or", 25]]);
        this.familles.base.push("Druide");

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            this.useEffect("Boeuf");
        }
    };

    useEffect = function (choice) {
        if (choice == "Humain") {
            this.transform("Druide marchand (forme humain)");
        }
        else if (choice == "Boeuf") {
            this.transform("Druide marchand (forme boeuf)");
        }
        this.zone.cards[this.slot].move("Terrain");
        this.pose();
    };
}

export class DruideMarchandHumain extends DruideMarchand {
    name = "Druide marchand (forme humain)";
    otherForm = "Druide marchand (forme boeuf)";

    constructor(System) {
        super(System);

        this.familles.base.push("Humain");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
    };

    startStepEffect = function () {
        this.owner.ressource("Or").max += 1;
    };
}

export class DruideMarchandBoeuf extends DruideMarchand {
    name = "Druide marchand (forme boeuf)";
    otherForm = "Druide marchand (forme humain)";

    constructor(System) {
        super(System);

        this.familles.base.push("Bête");

        this.trait("Rare").base = true;

        this.stat("Vie").base = 30;
        this.stat("Vie").current = 30;
        this.stat("Attaque").base = 10;
    };
}