import { Boss } from '../Boss.js';

export class Avatar extends Boss {
    name = "L'Avatar, chapitre final";

    constructor(System) {
        super(System);

        this.level = 20;
        this.elements.base = ["Neutre"];
        this.familles.base.push("Avatar");

        this.stat("Attaque").base = 100;
        this.stat("Vie").base = 1000;
        this.stat("Vie").current = 1000;
    };
}