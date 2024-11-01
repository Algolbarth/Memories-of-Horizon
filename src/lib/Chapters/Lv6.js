import { Chapter } from '../Game/Chapter.js';

export class Lv6_Roi extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 210);

        this.addStep(60, "Ville", ["Soldat", "Soldat", "Soldat", "Soldat", "Soldat", "Roi"], ["Le trône du royaume local est occupé par un usurpateur.", "Les villages alentours vous somment de faire tomber ce faux-roi."]);
    }
}

export class Lv6_Gyoun extends Chapter {
    boss = true;

    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 100);
        this.addRessource("Végétal", 100);

        this.addStep(60, "Forêt", ["Gyoun, colosse de jade"], ["Le puissant Gyoun est parti en retraite dans la région.", "Celui qui a falli faire tomber des royaumes veux connaitre votre valeur, le colosse de jade sort de son repos une dernière fois."]);
    }
}