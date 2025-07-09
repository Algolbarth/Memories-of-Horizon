import { Boss } from '../Boss.js';

export class Ballas extends Boss {
    name = "Ballas, suprémaciste";

    constructor(System) {
        super(System);

        this.level = 18;
        this.elements.base = ["Eau"];
        this.familles.base.push("Ondin");

        this.stat("Attaque").base = 10;
        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
    };
}