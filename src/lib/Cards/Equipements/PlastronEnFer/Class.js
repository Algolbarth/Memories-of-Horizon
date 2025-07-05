import { Equipment } from '../Equipement.js';
import Text from '../Text.svelte';

export class PlastronEnFer extends Equipment {
    name = "Plastron en fer";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);
        this.familles.base.push("Armure");
        
        this.equipStat("Vie").base = 45;

        this.text = Text;
    };

    useEffect = function (target) {
        target.equip(this);
        target.stat("Vie").current += this.equipStat("Vie").base;
        this.pose();
    };
}