import { Chapter } from '../Game/Chapter.js';

export class Lv7_Eruption extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 140);
        this.addRessource("Feu", 140);

        this.addStep(70, "Volcan", ["Éruption", "Pluie de feu", "Pluie de feu"], ["Une violente éruption volcanique surprend votre groupe !", "Pas le temps de vous enfuir, il faudra encaisser les dégâts."]);
    }
}

export class Lv7_Reine extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 280);

        this.addStep(80, "Ville", ["Chevalier géant", "Reine"], "Le chevalier favori de la reine exige un duel pour présenter une audience au souverain local.");
    }
}