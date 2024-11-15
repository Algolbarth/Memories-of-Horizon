import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class CavalierElfe extends Creature {
    name = "Cavalier elfe";

    constructor(System) {
        super(System);

        this.init([["Or", 15], ["Végétal", 15]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 20;
        this.stat("Vie").current = 20;
        this.stat("Attaque").base = 20;
        this.stat("Vitesse").base = 1;

        this.text = Text;
    };

    useEffect = function () {
        if (this.owner.totalIntelligence() >= 20) {
            this.stat("Vitesse").add += 1;
        }
        this.move("Défausse");
        this.pose();
    };
}