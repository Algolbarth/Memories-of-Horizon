import type { System } from "$lib/system/class";
import { StandardDeck } from "../standard";

export class Deck_Chevalier extends StandardDeck {
    constructor(system: System) {
        super(system, "Deck Chevaliers", ["Pierre philosophale", "Soldat", "Entraînement", "Ambidextrie", "Trésor", "Cavalier", "Chevalier", "Palefrenier", "Bannière", "Cheval de guerre", "Monstre errant", "Chambre du trésor", "Ruée", "Chevalier d'élite", "Chevalier noir (monté)", "Reine", "Chevalier royal", "Chevalier géant", "Bottes de sept lieues", "Donjon abandonné", "Chef-lieu", "Bouclier en cuir", "Pain", "Rappel", "Écuyer"]);
    };
};