import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class PlastronEnCuir extends Equipment {
    name = "Plastron en cuir";

    constructor(System) {
        super(System);

        this.init([["Or", 5]]);
        this.equipStat("Vie").base = 8;

        this.text = Text;
    };

    useEffect = function (target) {
        target.equip(this);
        target.stat("Vie").current += this.equipStat("Vie").base;
        this.pose();
    };
}