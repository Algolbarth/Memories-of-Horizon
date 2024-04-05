import { Boss } from '../Boss.js';

export class Kanki extends Boss {
    name = "Kanki, roi des bandits";

    constructor(System) {
        super(System);

        this.level = 4;
        this.elements = ["Neutre"];
        this.familles.base.push("Humain");

        this.stat("Attaque").base = 25;
        this.stat("Vie").base = 100;
        this.stat("Vie").current = 100;
    };
}