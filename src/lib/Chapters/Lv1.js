import { Chapter } from '../Game/Chapter.js';

export class Lv1_Humains extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 10);

        this.addStep(10, "Village", ["Humain"], ["Vous arrivez dans un petit village, mais les habitants vous font face."]);
        this.addStep(10, "Village", ["Humain", "Humain"]);
    }
}

export class Lv1_Bandits extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 10);

        this.addStep(10, "Plaine", ["Bandit"], ["Des bandits bloquent le chemin, désirants votre bourse."]);
        this.addStep(10, "Plaine", []);
        this.addStep(10, "Plaine", ["Bandit"]);
    }
}

export class Lv1_Loup extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 10);

        this.addStep(10, "Forêt", ["Loup gris"], ["Quelques loups affamés vous approchent, les crocs menaçants."]);
        this.addStep(10, "Forêt", ["Loup gris"]);
    }
}

export class Lv1_Chien extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 10);

        this.addStep(10, "Village", ["Chien", "Chien"], ["Au abords d'un village vous apercevez des chiens.", "Fouillant dans des débris pour se nourrir, ils n'ont pas l'air d'être domestiqué. Ou du moins ils ne le sont plus.", "Alors que vous alliez les contourner, ils vous foncent dessus."]);
        this.addStep(10, "Village", ["Chien", "Chien", "Chien"]);
    }
}

export class Lv1_Mendiant extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 10);

        this.addStep(10, "Ville", ["Mendiant"], ["Deux hommes se battent devant un bar.", "En vous approchant, il s'agit d'un ivrogne et d'un soldat soul."]);
        this.addStep(10, "Ville", ["Soldat"]);
    }
}