import { Lieu } from '../Lieu.js';
import Text from './Text.svelte';

export class Plaine extends Lieu {
    name = "Plaine";

    constructor(System) {
        super(System);

        this.init([["Or", 30]]);

        this.text = Text;
    };
}