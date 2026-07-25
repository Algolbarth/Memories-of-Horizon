import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv4_ChevalierNoir extends Chapter {
    level = 4;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 80);

        let deck = new ChapterDeck(system, "Chevalier noir", ["Rappel", "Menace", "Arrogance"]);
        this.addStep(20, ["Forêt"], 10, deck, ["Chevalier noir"], ["Le royaume local est terrorisé par un mystérieux chevalier qui menace d'attaquer le château si on ne lui livre pas la princesse.", "Vous décidez d'aller au point de rendez-vous à la place de cette dernière."]);
    };
};

export class Lv4_Wargs extends Chapter {
    level = 4;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 50);
        this.addRessource("Feu", 25);

        let deck = new ChapterDeck(system, "Wargs", ["Warg", "Morsure", "Griffure", "Frappe"]);
        this.addStep(20, ["Terres ignées"], 10, deck, ["Warg", "Morsure"], ["Un hurlement rauque résonne à travers la nuit.", "Des wargs rôdent autour du campement du groupe.", "Affamés et méfiants, ils attaquent quiconque s'approche de leur tanière voisine, où gisent les restes de précédents voyageurs."]);
    };
};

export class Lv4_ElementairesMarins extends Chapter {
    level = 4;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 15);
        this.addRessource("Eau", 65);

        let deck = new ChapterDeck(system, "Élémentaires marins", ["Élémentaire marin", "Sardines en boîte", "Ondin des rivières"]);
        this.addStep(20, ["Mer"], 10, deck, ["Élémentaire marin", "Ondin des rivières"], ["En refusant de livrer une offrandre à des ondins, ces derniers invoquent un élémentaire pour vous punir."]);
    };
};

export class Lv4_Bulettes extends Chapter {
    level = 4;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 45);
        this.addRessource("Terre", 35);

        let deck = new ChapterDeck(system, "Bulettes", ["Bulette", "Peau de pierre", "Contre"]);
        this.addStep(20, ["Montagne"], 10, deck, ["Bulette", "Peau de pierre", "Renforcement"], ["Le sol se met soudain à trembler : une bulette surgit de terre pour attaquer le groupe.", "Le combat sera bref mais brutal."]);
    };
};

export class Lv4_Gorilles extends Chapter {
    level = 4;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 50);
        this.addRessource("Nature", 25);

        let deck = new ChapterDeck(system, "Gorilles", ["Gorille", "Renforcement", "Écrasement"]);
        this.addStep(20, ["Forêt"], 10, deck, ["Gorille", "Renforcement", "Renforcement"], ["Le groupe surprend un gorille en train de défendre son territoire.", "La créature, aussi intimidante qu'hostile, charge pour vous effrayer."]);
    };
};

export class Lv4_Kanki extends Chapter {
    boss = true;
    level = 4;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 75);

        let deck = new ChapterDeck(system, "Roi des bandits", ["Bandit"]);
        this.addStep(20, ["Plaine"], 10, deck, ["Kanki, roi des bandits"], ["Les bandits sont connus pour s'organiser en groupes afin de mener des attaques d'envergure.", "Toutefois la taille de ces bandes ne peut pas excéder une centaine d'hommes, sous peine de se déchirer sur la répartition du butin.", "Un seul bandit fut capable de rallier tous les autres dans un intérêt commun, celui de survivre face aux nations.", "Le plus rusé et cruel d'entre eux, évitant le courroux de l'Empire malgré ses provocations et respecté par des généraux : Kanki, le roi des bandits."]);
    };
};