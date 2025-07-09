import { Unit } from '../../Unit.js';

export class Batiment extends Unit {
    type = "Bâtiment";

    constructor(System) {
        super(System);

        this.stat("Actions").base = 0;
    }
}