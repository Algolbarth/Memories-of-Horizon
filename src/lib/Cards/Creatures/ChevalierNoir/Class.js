import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Text2 from './Text2.svelte';
import Use from './Use.svelte';

export class ChevalierNoir extends Creature {
    name = "Chevalier noir";
    otherForm = "Chevalier noir (monté)";
    mounted = false;
    rez = false;

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Humain", "Chevalier");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.stat("Défense").base = 5;

        this.text = Text2;
    };

    dieEffect = function () {
        if (this.owner.ressource("Or").total() >= 20) {
            this.owner.ressource("Or").spend(20);
            this.stat("Vie").current = 1;
            this.rez = true;
        }
    };

    dieGo = function () {
        if (this.rez) {
            this.rez = false;
        }
        else {
            this.move("Défausse");
        }
    };
}

export class ChevalierNoirMonte extends Creature {
    name = "Chevalier noir (monté)";
    otherForm = "Chevalier noir";
    mounted = true;

    constructor(System) {
        super(System);

        this.init([["Or", 60]]);
        this.familles.base.push("Humain", "Chevalier");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 20;
        this.stat("Vitesse").base = 1;

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.System.game.use.set(this, Use);
                this.System.pages.change("Game");
            }
            else {
                this.useEffect(undefined);
            }
        }
        else {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
            else {
                this.useEffect(undefined);
            }
        }
    };

    useEffect = function (target) {
        if (target != undefined) {
            let value = target.stat("Vie").current;
            if (this.owner.ressource("Or").total() < value) {
                value = this.owner.ressource("Or").total();
            }
            this.owner.ressource("Or").spend(value);
            target.damage(value);
        }
        this.move("Terrain");
        this.pose();
    };

    dieEffect = function () {
        this.transform("Chevalier noir");
        this.zone.cards[this.slot].stat("Vie").current = this.zone.cards[this.slot].stat("Vie").value();
    };

    dieGo = function () {

    };
}