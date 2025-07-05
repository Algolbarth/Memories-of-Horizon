import { Action } from '../Actions/Action.js';

export class Sort extends Action {
    constructor(System) {
        super(System);

        this.familles.base.push("Sort");
    }

    manaCost = function (value) {
        if (value < 0) {
            value = 0;
        }

        return value;
    };
}