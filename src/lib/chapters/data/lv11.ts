import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv11_Princesse extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 500);

        let cards: string[] = [];
        for (let i = 1; i <= 3; i++) {
            cards.push("Princesse");
        }
        for (let i = 1; i <= 10; i++) {
            cards.push("Soldat");
        }
        let deck = new ChapterDeck(system, "Princesses", ["Princesse", "Soldat"]);
        this.addStep(55, ["Ville"], 20, deck, cards, ["Les trois princesses d'un royaume voisin décident de se rebeller face à la reine mère.", "Cette dernière vous recrute pour les corriger et briser la rébellion."]);
    };
};