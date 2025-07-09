import { copy } from '../../../../Utils';
import { Creature } from '../Creature.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class ElementaireDeRoche extends Creature {
    name = "Élémentaire de roche";

    constructor(System) {
        super(System);

        this.init([["Terre", 50]]);
        this.familles.base.push("Élémentaire");

        this.stat("Vie").base = 40;
        this.stat("Vie").current = 40;
        this.stat("Attaque").base = 40;
        this.stat("Défense").base = 10;

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
                this.useEffect("Créature");
            }
        }
        else {
            if (this.owner.adversary().zone("Terrain").cards.length > 5) {
                this.useEffect("Effet");
            }
            else if (!this.owner.zone("Terrain").isFull()) {
                this.useEffect("Créature");
            }
        }
    };

    useEffect = function (choice) {
        if (choice == "Créature") {
            this.move("Terrain");
        }
        else if (choice == "Effet") {
            let terrain = copy(this.owner.adversary().zone("Terrain").cards);
            for (const card of terrain) {
                card.damage(5);
            }
            this.destroy();
        }
        this.pose();
    };
}