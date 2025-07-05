import { Boss } from '../Boss.js';

export class DucYousei extends Boss {
    name = "Duc Yousei";

    constructor(System) {
        super(System);

        this.level = 8;
        this.elements.base = ["Feu"];
        this.familles.base.push("Gobelin");

        this.stat("Attaque").base = 10;
        this.stat("Vie").base = 50;
        this.stat("Vie").current = 50;
    };
}