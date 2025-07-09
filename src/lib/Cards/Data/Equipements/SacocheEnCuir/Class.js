import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';

export class SacocheEnCuir extends Equipment {
    name = "Sacoche en cuir";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);

        this.text = Text;
    };

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.owner.discover(2);
        }
    };
}