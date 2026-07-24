import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv3_Geant extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 50);

        let deck = new ChapterDeck(system, "Géant", ["Entraînement", "Bière"]);
        this.addStep(15, ["Plaine"], 10, deck, ["Géant"], ["Un géant manque de vous marcher dessus.", "Il serait bon ton de lui apprendre à faire attention."]);
    };
};

export class Lv3_Gobelin extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 26);
        this.addRessource("Feu", 24);

        let deck = new ChapterDeck(system, "Gobelins", ["Guerrier gobelin", "Gobelin", "Camp de gobelin"]);
        this.addStep(15, ["Terres ignées"], 10, deck, ["Guerrier gobelin", "Guerrier gobelin", "Gobelin", "Gobelin"], ["Un petit groupe de gobelin en manque de sensations fortes vous injective.", "Ils ne semblent pas disposés à négocier ou à entendre raison."]);
    };
};

export class Lv3_Ondin extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);
        this.addRessource("Eau", 25);

        let deck = new ChapterDeck(system, "Ondins", ["Ondin des rivières", "Hydratation"]);
        this.addStep(15, ["Mer"], 10, deck, ["Ondin des rivières", "Hydratation"], ["En tentant de traverser un cours d'eau à la nage, vous vous rendez compte que des ondins vous observent.", "Ils sont à leur avantage dans l'eau, le combat ne sera pas facile."]);
    };
};

export class Lv3_Elfe extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);
        this.addRessource("Nature", 25);

        let deck = new ChapterDeck(system, "Elfes", ["Guerrier elfe", "Archer elfe", "Cavalier elfe"]);
        this.addStep(15, ["Forêt"], 10, deck, ["Guerrier elfe", "Guerrier elfe", "Archer elfe"], ["Lors d'une chasse aux abords d'une forêt, un groupe d'elfe vous ordonne de vous éloigner.", "Vous avez besoin de cette nourriture mais les elfes ne changent pas d'avis."]);
    };
};

export class Lv3_Nain extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 35);
        this.addRessource("Terre", 15);

        let deck = new ChapterDeck(system, "Nains", ["Barricade", "Soldat nain"]);
        this.addStep(15, ["Montagne"], 10, deck, ["Barricade", "Barricade", "Soldat nain"], ["Une cité naine locale a décidé d'établir des points de contrôle dans toute la région.", "Vous ne pouvez pas vous permettre de perdre plus de temps, il faudra vous battre."]);
    };
};