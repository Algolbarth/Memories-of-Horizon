import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv16_Barbare extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 1190);
        this.addRessource("Feu", 60);

        let cards: string[] = [];
        for (let i = 1; i <= 5; i++) {
            cards.push("Chef barbare");
        }
        for (let i = 1; i <= 5; i++) {
            cards.push("Doubles hachettes barbare");
        }
        for (let i = 1; i <= 5; i++) {
            cards.push("Sang chaud");
        }
        for (let i = 1; i <= 3; i++) {
            cards.push("Cor de guerre");
        }
        let deck = new ChapterDeck(system, "Barbares", ["Cor de guerre", "Sang chaud", "Chef barbare"]);
        this.addStep(80, ["Plaine"], 20, deck, cards, ["Des tribus barbares s'entretuent dans les grandes plaines environnantes.", "Au coeur de la mêlée, les chefs galvanisés par leurs troupes se préparent à en finir.", "Le plus simple pour traverser cette hécatombe serait de les faire tomber ensemble."]);
    };
};

export class Lv16_Atlas extends Chapter {
    boss = true;
    level = 16;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 1250);

        let deck = new ChapterDeck(system, "Marche-cratère", ["Ténacité", "Frappe", "Écrasement", "Tremblement de terre"]);
        this.addStep(80, ["Montagne"], 10, deck, ["Atlas, marche-cratère"], ["Dans la plus grande grotte de la plus haute montagne de l'île, vit un géant hors du commun.", "Atlas est reputé pour sa taille qui impressionne même les dieux.", "Mais son manque d'éducation en fit un individu solitaire et abruti, écrasant des paysages par inattention."]);
    };
};