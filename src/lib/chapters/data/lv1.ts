import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv1_Humains extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 10);

        let deck = new ChapterDeck(system, "Humains", ["Humain"]);
        this.addStep(5, ["Village"], 10, deck, ["Humain"], ["Vous arrivez dans un petit village, mais les habitants vous font face."]);
    };
};

export class Lv1_Bandits extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 10);

        let deck = new ChapterDeck(system, "Bandits", ["Bandit"]);
        this.addStep(5, ["Plaine"], 10, deck, ["Bandit"], ["Des bandits bloquent le chemin, désirants votre bourse."]);
    };
};

export class Lv1_Loup extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 10);

        let deck = new ChapterDeck(system, "Loups", ["Loup gris"]);
        this.addStep(5, ["Forêt"], 10, deck, ["Loup gris"], ["Quelques loups affamés vous approchent, les crocs menaçants."]);
    };
};

export class Lv1_Chien extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 10);

        let deck = new ChapterDeck(system, "Chiens", ["Chien"]);
        this.addStep(5, ["Village"], 10, deck, ["Chien", "Chien"], ["Au abords d'un village vous apercevez des chiens.", "Fouillant dans des débris pour se nourrir, ils n'ont pas l'air d'être domestiqué. Ou du moins ils ne le sont plus.", "Alors que vous alliez les contourner, ils vous foncent dessus."]);
    };
};

export class Lv1_Mendiant extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 10);

        let deck_1 = new ChapterDeck(system, "Mendiant", ["Mendiant", "Bière"]);
        this.addStep(5, ["Ville"], 10, deck_1, ["Mendiant"], ["Deux hommes se battent devant un bar.", "En vous approchant, il s'agit d'ivrognes et de soldats souls."]);

        let deck_2 = new ChapterDeck(system, "Soldats", ["Soldat", "Bière"]);
        this.addStep(5, ["Ville"], 10, deck_2, ["Soldat"], ["Les soldats ivres se mettent en colère à leur tour."]);
    };
};