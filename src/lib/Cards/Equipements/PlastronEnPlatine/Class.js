import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class PlastronEnPlatine extends Equipment {
    name = "Plastron en platine";

    constructor(System) {
        super(System);

        this.init([["Or", 100]]);
        this.equipStat("Vie").base = 150;

        this.text = Text;
    };

    useEffect = function (target) {
        target.equip(this);
        target.stat("Vie").current += this.equipStat("Vie").base;
        this.pose();
    };
}