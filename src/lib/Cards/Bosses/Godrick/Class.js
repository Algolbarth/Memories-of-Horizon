import { Boss } from '../Boss.js';

export class Godrick extends Boss {
    name = "Godrick, roi des rois";

    constructor(System) {
        super(System);

        this.level = 14;
        this.elements.base = ["Neutre"];
        this.familles.base.push("Humain");

        this.stat("Attaque").base = 100;
        this.stat("Vie").base = 1000;
        this.stat("Vie").current = 1000;
    };
}