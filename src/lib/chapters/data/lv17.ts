import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv17_Geomarteau extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 1100);
        this.addRessource("Terre", 400);

        let cards: string[] = [];
        for (let i = 1; i <= 3; i++) {
            cards.push("Chevalier géant", "Ambidextrie", "Gantelets de fer", "Géomarteau", "Ténacité");
        }
        let deck = new ChapterDeck(system, "Chevaliers", ["Chevalier géant", "Ténacité", "Préparation"]);
        this.addStep(85, ["Montagne"], 20, deck, cards, ["Alors que vous progressez sur un col étroit, un grondement sourd se fait entendre, vibrant à travers la roche.", "Des ombres massives apparaissent à l'horizon, se dessinant contre le ciel nuageux : des géants.", "Équipés de marteaux gigantesques, forgés dans la pierre même des montagnes, ils sont les gardiens de ces terres oubliées.", "Les géants ne sont pas ennemis par nature, mais leur but est de protéger les secrets des montagnes et de tester votre valeur."]);
    };
};