import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Prêtre extends Creature {
    name = "Prêtre";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);
        this.familles.base.push("Humain");

        this.stat("Vie").base = 5;
        this.stat("Vie").current = 5;
        this.stat("Attaque").base = 5;

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            let check = false;

            for (const card of this.owner.zone("Terrain").cards) {
                if (check == false && card.type == "Créature") {
                    check = true;
                }
            }

            if (check) {
                this.System.game.use.set(this, Use);
            }
            else {
                this.useEffect(undefined, undefined);
            }
        }
        else {
            let target = undefined;

            for (const card of this.owner.zone("Terrain").cards) {
                if (target == undefined && card.type == "Créature") {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target, "life");
            }
            else {
                this.useEffect(target, undefined);
            }
        }
    };

    useEffect = function (target, choice) {
        if (choice == "life") {
            target.stat("Vie").add += 10;
            target.stat("Vie").current += 10;
        }
        else if (choice == "heal") {
            target.heal(20);
        }
        this.move("Terrain");
        this.pose();
    };
}