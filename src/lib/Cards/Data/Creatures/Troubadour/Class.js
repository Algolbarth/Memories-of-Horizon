import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Troubadour extends Creature {
    name = "Troubadour";

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
                this.useEffect(undefined);
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
                this.useEffect(target);
            }
            else {
                this.useEffect(undefined);
            }
        }
    };

    useEffect = function (target) {
        if (target != undefined) {
            target.stat("Vie").current += 20;
            target.stat("Vie").step += 20;
            target.stat("Attaque").step += 20;
        }
        this.move("Terrain");
        this.pose();
    };
}