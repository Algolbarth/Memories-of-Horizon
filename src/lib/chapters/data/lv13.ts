import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv13_Generaux extends Chapter {
    level = 13;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 710);

        let cards: string[] = [];
        cards.push("Bombardement");
        for (let i = 1; i <= 5; i++) {
            cards.push("Chevalier d'élite (monté)");
        }
        cards.push("Général");
        let deck_1 = new ChapterDeck(system, "Général", ["Bombardement", "Chevalier d'élite (monté)"]);
        this.addStep(65, ["Ville"], 10, deck_1, cards, ["Le royaume voisin est en pleine guerre civile entre deux généraux.", "Le premier général est en train d'assiéger la capitale avec ses chevaliers."]);

        cards = [];
        cards.push("Muraille");
        for (let i = 1; i <= 5; i++) {
            cards.push("Chevalier royal");
        }
        cards.push("Général");
        let deck_2 = new ChapterDeck(system, "Général", ["Chevalier royal"]);
        this.addStep(65, ["Ville"], 10, deck_2, cards, ["Le deuxième général est retranché dans la ville derrière les remparts."]);
    };
};