import { Objet } from '../Objet.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Pomme extends Objet {
    name = "Pomme";

    constructor(System) {
        super(System);

        this.init([["Or", 4], ["Végétal", 4]]);
        this.familles.base.push("Nourriture");

        this.text = Text;
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
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
        this.targeting(target);
        if (target.stat("Vie").current == target.stat("Vie").value()) {
            target.stat("Vie").add += 5;
            target.stat("Vie").current += 5;
        }
        else {
            target.heal(10);
        }
        this.move("Défausse");
        this.pose();
    };
}