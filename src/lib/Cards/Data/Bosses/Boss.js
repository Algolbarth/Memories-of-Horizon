import { Creature } from '../Creatures/Creature.js';

export class Boss extends Creature {
    constructor(System) {
        super(System);

        this.trait("Légendaire").base = true;
    }
}