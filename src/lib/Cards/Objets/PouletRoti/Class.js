import { Objet } from '../Objet.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class PouletRoti extends Objet {
    name = "Poulet roti";

    constructor(System) {
        super(System);

        this.init([["Or", 4], ["Feu", 4]]);
        this.familles.base.push("Nourriture");

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
        if (target.stat("Vie").current == target.stat("Vie").value()) {
            target.stat("Attaque").add += 10;
        }
        else {
            target.heal(10);
        }
        this.move("Défausse");
        this.pose();
    };
}