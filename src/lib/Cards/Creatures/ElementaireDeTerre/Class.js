import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class ElementaireDeTerre extends Creature {
    name = "Élémentaire de terre";

    constructor(System) {
        super(System);

        this.init([["Terre", 15]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Défense").base = 5;

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
            target.damage(30);
            this.destroy();
        }
        else {
            this.move("Terrain");
        }
        this.pose();
    };
}