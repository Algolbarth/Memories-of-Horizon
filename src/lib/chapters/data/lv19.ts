import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv19_ChevalierGeant extends Chapter {
    level = 19;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 2540);

        let cards: string[] = [];
        for (let i = 1; i <= 7; i++) {
            cards.push("Chevalier géant (monté)");
        }
        for (let i = 1; i <= 4; i++) {
            cards.push("Roi");
        }
        let deck = new ChapterDeck(system, "Chevaliers géant", ["Roi", "Chevalier géant (monté)"]);
        this.addStep(95, ["Ville"], 10, deck, cards, ["À peine arrivé à la capitale locale, vous êtes invité par les gardes à rencontrer les rois. Dans la grande salle du trône, vous vous tenez face à un groupe imposant de chevaliers. Les trônes sont occupés par ceux qui vont tendent ce piège, sûrs de leur capacité à vous soumettre."]);
    };
};