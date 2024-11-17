import { Sort } from '../Sort.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class BulleProtectrice extends Sort {
    name = "Bulle protectrice";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Eau", 15]]);

        this.text = Text;
    };
    
    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
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
        }
    };

    useEffect = function (target) {
        if (this.owner.ressource("Mana").total() >= this.manaCost(25)) {
            this.owner.ressource("Mana").spend(this.manaCost(25));
            target.stat("Garde").fix(100);
        }
        else {
            target.stat("Garde").fix(50);
        }
        this.move("Défausse");
        this.pose();
    };
}