import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv5_Chevalier extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 100);

        let deck = new ChapterDeck(system, "Chevaliers", ["Chevalier (monté)", "Chevalier"]);
        this.addStep(25, ["Plaine"], 10, deck, ["Chevalier (monté)", "Chevalier (monté)"], ["Une troupe de chevalier errant terrorise la région en usant de leur privilège pour vivre aux dépends des habitants."]);
    };
};

export class Lv5_Iconoclastes extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 60);
        this.addRessource("Feu", 40);

        let deck = new ChapterDeck(system, "Iconoclastes", ["Iconoclaste", "Autodafé", "Bûcher des vanités"]);
        this.addStep(25, ["Terres ignées"], 10, deck, ["Iconoclaste", "Autodafé", "Trésor", "Bûcher des vanités"], ["Vous tombez sur un bûcher où des fanatiques brûlent livres et objets de valeur en scandant des slogans contre la corruption de l'Empire.", "Vous tentez de vous interposer pour sauver quelques artefacts mais les fanatiques défendent leur brasier."]);
    };
};

export class Lv5_Poissons extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 50);
        this.addRessource("Eau", 50);

        let deck = new ChapterDeck(system, "Poissons", ["Brochet", "Espadon", "Sardine"]);
        this.addStep(25, ["Mer"], 20, deck, ["Grand requin blanc"], ["En pêchant aux abords de la mer, le groupe attire un banc de poissons agités...", "Suivis de près par un requin affamé qui rôde sous la surface !"]);
    };
};

export class Lv5_Ours extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 50);
        this.addRessource("Terre", 50);

        let deck = new ChapterDeck(system, "Ours", ["Maman ours", "Ours brun", "Ourson"]);
        this.addStep(25, ["Montagne"], 10, deck, ["Maman ours", "Ours brun"], ["En montagne, le groupe croise plusieurs familles d'ours occupant un territoire commun autour de tanières.", "Vous devez passer dans les zones de chasse mais s'approcher trop près déclenche une réaction défensive féroce."]);
    };
};

export class Lv5_Betes extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 60);
        this.addRessource("Nature", 40);

        let cards: string[] = [];
        for (let i = 1; i <= 5; i++) {
            cards.push("Louveteau");
        }
        cards.push("Sanglier");
        cards.push("Cerf");
        let deck = new ChapterDeck(system, "Bêtes", ["Cerf", "Sanglier", "Louveteau", "Hérisson", "Lapin"]);
        this.addStep(25, ["Forêt"], 10, deck, cards, ["Le groupe doit traquer et abattre suffisamment de gibier pour ravitailler une caravane avant la tombée de la nuit.", "Chaque animal traqué demandera discrétion et rapidité, sous peine de le voir s'enfuir ou d'attirer un prédateur plus dangereux."]);
    };
};