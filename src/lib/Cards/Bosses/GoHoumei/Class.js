import { Boss } from '../Boss.js';

export class GoHoumei extends Boss {
    name = "Go Houmei, reine des tours";

    constructor(System) {
        super(System);

        this.level = 8;
        this.elements.base = ["Terre"];
        this.familles.base.push("Nain");

        this.stat("Attaque").base = 25;
        this.stat("Vie").base = 500;
        this.stat("Vie").current = 500;
    };
}