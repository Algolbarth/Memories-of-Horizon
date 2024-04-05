import {Objet} from '../Objet.js';
import Text from './Text.svelte';

export class Banniere extends Objet {
    name = "Bannière";

    constructor (System) {
        super(System);

        this.init([["Or", 30]]);

        this.text = Text;
    };

    use = function () {
        if (this.owner == this.System.game.player || this.owner.zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let terrain = this.System.copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature") {
                card.stat("Attaque").add += 3;
                card.stat("Vie").current += 3;
                card.stat("Vie").add += 3;
            }
        }
        this.move("Défausse");
        this.pose();
    };
}