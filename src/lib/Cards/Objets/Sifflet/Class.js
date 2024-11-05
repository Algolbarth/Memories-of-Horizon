import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class Sifflet extends Objet {
    name = "Sifflet";

    constructor(System) {
        super(System);

        this.init([["Or", 10]]);

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.type == "Créature" && card.familles.total().includes("Bête")) {
                return true;
            }
            return false;
        };
        this.owner.draw(1, condition);

        let terrain = this.System.copy(this.owner.zone("Terrain").cards);
        for (const card of terrain) {
            if (card.type == "Créature" && card.familles.total().includes("Bête")) {
                card.stat("Attaque").add += 1;
                card.stat("Vie").current += 1;
                card.stat("Vie").add += 1;
            }
        }

        this.move("Défausse");
        this.pose();
    };
}