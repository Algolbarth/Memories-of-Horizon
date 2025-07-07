import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class ElementaireDeCaillou extends Creature {
    name = "Élémentaire de caillou";

    constructor(System) {
        super(System);

        this.init([["Terre", 3]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 3;
        this.stat("Vie").current = 3;
        this.stat("Attaque").base = 3;

        this.text = Text;
    };

    use = function () {
        this.select();
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.System.game.use.set(this, Use);
            }
            else if (!this.owner.zone("Terrain").isFull()) {
                this.useEffect(undefined);
            }
        }
        else {
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
            else if (!this.owner.zone("Terrain").isFull()) {
                this.useEffect(undefined);
            }
        }
    };

    useEffect = function (target) {
        if (target != undefined) {
            target.damage(5);
            this.destroy();
        }
        else {
            this.move("Terrain");
        }
        this.pose();
    };
}