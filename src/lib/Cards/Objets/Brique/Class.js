import { Objet } from '../Objet.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Brique extends Objet {
    name = "Brique";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Terre", 8]]);

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
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
        }
    };

    useEffect = function (target, choice) {
        if (choice == "heal") {
            target.heal(20);
        }
        else {
            target.damage(20);
        }
        this.move("Défausse");
        this.pose();
    };
}