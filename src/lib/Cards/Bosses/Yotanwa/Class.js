import { Boss } from '../Boss.js';

export class Yotanwa extends Boss {
    name = "Yotanwa, patronne de la guerre";

    constructor(System) {
        super(System);

        this.level = 12;
        this.elements.base = ["Neutre"];
        this.familles.base.push("Humain");

        this.stat("Attaque").base = 10;
        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
    };
}