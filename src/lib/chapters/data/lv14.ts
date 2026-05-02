import { ChapterDeck } from '$lib/deck/chapter';
import type { Game } from '$lib/game/class';
import type { System } from '$lib/system/class';
import { Chapter } from '../class';

export class Lv14_MageFeu extends Chapter {
    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 530);
        this.addRessource("Feu", 320);

        let cards = [];
        for (let i = 1; i <= 15; i++) {
            cards.push("Mage de feu");
        }
        for (let i = 1; i <= 10; i++) {
            cards.push("Boule de feu");
        }
        for (let i = 1; i <= 2; i++) {
            cards.push("Baguette d'archimage");
        }
        for (let i = 1; i <= 2; i++) {
            cards.push("Pluie de feu");
        }
        let deck = new ChapterDeck(system, "Mages de feu", ["Mage de feu", "Cercles magiques", "Boule de feu", "Pluie de feu"]);
        this.addStep(70, ["Terres ignées"], 40, deck, cards, ["Une rumeur concernant des membres rebels d'une école de la magie de feu se répend dans la région.", "En vous rendant dans l'établissement, le directeur vous explique la situation et vous conseille de fouiller les ruines de l'ancienne école.", "Vous y trouvez une ancienne salle abandonnée, la chaleur suffocante émanant des murs rongés par des flammes mystiques.", "Au centre, les mages vêtus de robes écarlates commencent à incanter."]);
    };
};

export class Lv14_Godrick extends Chapter {
    boss = true;
    level = 14;

    constructor(system: System, game: Game, number: number) {
        super(system, game, number);

        this.addRessource("Or", 850);

        let deck = new ChapterDeck(system, "Roi des rois", ["Chevalier royal (monté)", "Reine", "Roi"]);
        this.addStep(70, ["Ville"], 10, deck, ["Godrick, roi des rois"], ["Avant la création de l'Empire, durant la grande guerre, les royaumes étaient encore rivaux.", "Un humain parvient cependant à créer la plus grande alliance de tout le conflit, un espoir de paix dans une période de pure violence.", "Celui qui l'on nomma le roi des rois fut sans aucun doute un précurseur, et ses efforts eurent un effet décisif pour le renouveau de l'Horizon."]);
    };
};