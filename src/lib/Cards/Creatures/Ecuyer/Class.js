import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Ecuyer extends Creature {
    name = "Écuyer";

    constructor(System) {
        super(System);

        this.init([["Or", 110]]);
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
                if (check == false && card.type == "Créature" && card.familles.total().includes("Chevalier") && !card.mounted) {
                    check = true;
                }
            }

            if (check) {
                this.System.game.use.set(this, Use);
                this.System.pages.change("Game");
            }
            else {
                this.useEffect(undefined);
            }
        }
        else {
            let target = undefined;

            for (const card of this.owner.zone("Terrain").cards) {
                if (target == undefined && card.type == "Créature" && card.familles.total().includes("Chevalier") && !card.mounted) {
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
            target.move("Main");
            target.transform(target.otherForm);
        }
        this.move("Terrain");
        this.pose();
    };
}