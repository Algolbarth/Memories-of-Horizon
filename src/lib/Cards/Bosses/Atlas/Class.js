import { Boss } from '../Boss.js';

export class Atlas extends Boss {
    name = "Atlas, marche-cratère";

    constructor(System) {
        super(System);

        this.level = 10;
        this.elements = ["Neutre"];
        this.familles.base.push("Géant");

        this.stat("Attaque").base = 100;
        this.stat("Vie").base = 1000;
        this.stat("Vie").current = 1000;
    };
}