import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class ChevalDeGuerre extends Creature {
    name = "Cheval de guerre";

    constructor(System) {
        super(System);

        this.init([["Or", 40]]);
        this.familles.base.push("Bête");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Vitesse").base = 1;

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
            target.stat("Vie").add += 10;
            target.stat("Vie").add += 10;
            target.stat("Attaque").add += 10;
            target.stat("Vitesse").add += 1;
        }
        this.move("Terrain");
        this.pose();
    };
}