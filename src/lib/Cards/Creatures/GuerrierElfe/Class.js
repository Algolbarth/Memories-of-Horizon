import { Creature } from '../Creature.js';
import Text from './Text.svelte';

export class GuerrierElfe extends Creature {
    name = "Guerrier elfe";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Végétal", 8]]);
        this.familles.base.push("Elfe");

        this.stat("Vie").base = 10;
        this.stat("Vie").current = 10;
        this.stat("Attaque").base = 10;
        this.stat("Défense").base = 5;

        this.text = Text;
    };

    useEffect = function () {
        if (this.owner.totalIntelligence() >= 20) {
            this.stat("Vie").current += 10;
            this.stat("Vie").add += 10;
            this.stat("Attaque").add += 10;
            this.stat("Défense").add += 5;
        }
        this.move("Défausse");
        this.pose();
    };
}