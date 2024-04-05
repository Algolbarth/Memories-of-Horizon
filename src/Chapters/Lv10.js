import { Chapter } from '../Chapter.js';

export class Lv10_Reine extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 550);

        let array = ["Chevalier monté"];
        for (let i = 0; i < 4; i++) {
            array.push("Reine");
        }
        this.addStep(100, "Ville", array, ["Le plus grand chevalier du continent est désigné par les 5 royaumes alentours.", "Au coeur d'une controverse, vous devez déterminer si ce chevalier a pris parti pour l'un des roi."]);
    }
}

export class Lv10_Atlas extends Chapter {
    boss = true;
    
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 500);

        this.addStep(80, "Montagne", ["Atlas, marche-cratère"], "Dans la plus grande grotte de la plus haute montagne de l'île, vit un géant hors du commun.", "Atlas est reputé pour sa taille qui impressionne même les dieux.", "Mais son manque d'éducation en fit un individu solitaire et bête, écrasant des paysages par inattention.");
    }
}