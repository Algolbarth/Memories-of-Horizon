import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv20_Archimere extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 1500);
        this.addRessource("Nature", 1500);

        let cards = [];
        for (let i = 1; i <= 10; i++) {
            cards.push("Élémentaire des racines");
        }
        for (let i = 1; i <= 5; i++) {
            cards.push("Archimère");
        }
        for (let i = 1; i <= 10; i++) {
            cards.push("Druide des bois (forme elfe)");
        }
        for (let i = 1; i <= 20; i++) {
            cards.push("Biodiversité");
        }
        let deck = new ChapterDeck(system, "Biodiversité", ["Biodiversité", "Chimère", "Croissance"]);
        this.addStep(100, ["Forêt"], 50, deck, cards, ["La véritable force de l'élément nature ne repose pas tant sur la longévité de ses créatures que sur la diversité de ces dernières.", "Les puissantes chimères sont des créatures s'abreuvant de cette génétique variée et deviennent les gardiennes naturelles des innombrables espèces de cet écosystème.", "Au coeur d'une forêt comme celle-là, l'affrontement sera inévitable."]);
    };
};

export class Lv20_Avatar extends Chapter {
    boss = true;
    level = 20;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 3000);

        let deck = new ChapterDeck(system, "Chapitre final", ["Élimination", "Démolition", "Omniscience"]);
        this.addStep(100, ["Zone intersidérale"], 10, deck, ["L'Avatar, chapitre final"], ["L'Histoire prend fin ici même, dans les méandres de l'ether composant l'espace immense de l'Horizon."]);
    };
};