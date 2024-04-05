import { Chapter } from '../Chapter.js';

export class Lv9_Reine extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 450);

        let array = [];
        for (let i = 0; i < 3; i++) {
            array.push("Princesse");
        }
        for (let i = 0; i < 12; i++) {
            array.push("Soldat");
        }
        this.addStep(90, "Ville", array, ["Les trois princesses d'un royaume voisin décident de se rebeller face à la reine mère.", "Cette dernière vous recrute pour les corriger."]);
    }
}