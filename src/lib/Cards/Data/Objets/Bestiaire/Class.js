import { Objet } from '../Objet.js';
import Text from './Text.svelte';

export class Bestiaire extends Objet {
    name = "Bestiaire";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);

        this.text = Text;
    };

    useEffect = function () {
        let condition = function (card) {
            if (card.type == "Créature") {
                return true;
            }
            return false;
        };

        if (this.owner.totalIntelligence() >= 20) {
            this.owner.discover(5, condition);
        }
        else {
            this.owner.discover(3, condition);
        }

        this.move("Défausse");
        this.pose();
    };
}