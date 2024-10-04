import { Sort } from '../Sort.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class CreationRocheuse extends Sort {
    name = "Création rocheuse";

    constructor(System) {
        super(System);

        this.init([["Or", 35], ["Terre", 35]]);

        this.text = Text;
    };

    use = function () {
        if (this.owner.ressource("Mana").total() >= 50) {
            this.useEffect();
        }
        else {
            if (this.owner == this.System.game.player) {
                this.System.game.use.set(this, Use);
                this.System.pages.change("Game");
            }
            else {
                this.useEffect("Créature");
            }
        }
    };

    useEffect = function (choice) {
        if (this.owner.ressource("Mana").total() >= this.manaCost(50)) {
            this.owner.ressource("Mana").spend(this.manaCost(50));
            this.owner.getCard("Élémentaire de roche").add("Terrain");
            this.owner.getCard("Mur de roche").add("Terrain");
        }
        else {
            if (choice == "Créature") {
                this.owner.getCard("Élémentaire de roche").add("Terrain");
            }
            else if (choice == "Bâtiment") {
                this.owner.getCard("Mur de roche").add("Terrain");
            }
        }

        this.move("Défausse");
        this.pose();
    };
}