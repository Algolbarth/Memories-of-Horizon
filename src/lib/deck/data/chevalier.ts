import type { System } from "$lib/system/class";
import { StandardDeck } from "../standard";

export class Deck_Chevalier extends StandardDeck {
    constructor(system: System) {
        super(system, "Deck Chevaliers", ["Pierre philosophale", "Soldat", "Entraînement", "Ambidextrie", "Trésor", "Chevalier", "Palefrenier", "Cheval de guerre", "Monstre errant", "Chambre du trésor", "Chevalier d'élite", "Chevalier noir (monté)", "Reine", "Chevalier royal", "Chevalier géant", "Bottes de sept lieues", "Donjon abandonné", "Chef-lieu", "Bouclier en cuir", "Pain", "Rappel", "Écuyer", "Dame du chevalier", "Bannière", "Marchand", "Roi", "Cavalier", "Flèche en bois", "Couronne", "Fidèle serviteur", "Wyverne dorée", "Grande wyverne dorée", "Ancienne wyverne dorée", "Donjon abandonné", "Élimination", "Démolition", "Caserne", "Épée de platine", "Bouclier de platine", "Épée de cuivre", "Rétablissement", "Voyage initiatique", "Brioche", "Guilde des marchands", "Adoubement", "Mémorial", "Capitale", "Diadème"]);
    };
};