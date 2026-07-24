import { ChapterDeck } from '$lib/deck/chapter';
import { Deck } from '$lib/deck/class';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv2_Mur extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);

        let deck = new ChapterDeck(system, "Gardes", ["Garde", "Barricade", "Soldat"]);
        this.addStep(10, ["Plaine"], 10, deck, ["Barricade", "Soldat"], ["Un mur vous barre la route tandis que des gardes s'avancent vers vous."]);
    };
};

export class Lv2_Bandits extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);

        let deck = new ChapterDeck(system, "Bandits", ["Bandit"]);
        this.addStep(10, ["Forêt"], 10, deck, ["Flèche en bois", "Flèche en bois", "Flèche en bois"], ["Tandis que vous voyagez sur une route, on se met à vous tirer dessus."]);
        this.addStep(10, ["Forêt"], 10, deck, ["Bandit", "Bouclier en cuir", "Bandit", "Épée de cuivre"], ["Des bandits vous tendent une embuscade."]);
    };
};

export class Lv2_Ferme extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);

        let deck = new ChapterDeck(system, "Ferme", ["Vache", "Chien", "Fermier", "Faux de paysan"]);
        this.addStep(10, ["Plaine"], 10, deck, ["Vache", "Vache", "Chien"], ["Une colonne de vache vous bloque la route.", "Des fermiers semblent se disputer la propriété du bétail tout en vous empêchant de passer."]);
    };
};

export class Lv2_Barbare extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);

        let deck = new ChapterDeck(system, "Barbare", ["Barbare", "Épée de cuivre"]);
        this.addStep(10, ["Plaine"], 10, deck, ["Barbare", "Épée de cuivre"], ["Vous voyagez dans une plaine peuplée de peuples barbares."]);
    };
};

export class Lv2_Voleur extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 25);

        let deck = new ChapterDeck(system, "Voleur", ["Voleur", "Dague de cuivre"]);
        this.addStep(10, ["Ville"], 10, deck, ["Voleur", "Dague de cuivre", "Dague de cuivre"], ["Un voleur tente de vous ôtez votre bourse discrétement mais vous parvenez à le surprendre à temps."]);
    };
};

export class Lv2_Raido extends Chapter {
    boss = true;
    level = 2;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 30);

        let deck = new ChapterDeck(system, "Chef brutal", ["Bandit", "Entraînement"]);
        this.addStep(10, ["Plaine"], 10, deck, ["Raido, chef brutal", "Bandit", "Bandit"], ["Un groupe de bandit s'est installé dans une vallée.", "Il s'agirait de Raido à en croire des rescapés d'un village voisin.", "Lui et ses hommes sont connus pour rivaliser avec des soldats entrainés."]);
    };
};