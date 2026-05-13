import type { System } from "$lib/system/class";
import { StandardDeck } from "../standard";

export class Deck_Elfe extends StandardDeck {
    constructor(system: System) {
        super(system, "Deck Elfes", ["Forêt", "Elfe", "Doyen", "Croissance", "Garde d'épine", "Massue de chêne", "Trésor", "Marchand", "Pain", "Pomme", "Gorille", "Gorille dos argenté", "Gorille enragé", "Bibliothèque elfique", "Peau d'écorce", "Biodiversité", "Chimère", "Archimère", "Wyverne verte", "Grande wyverne verte", "Ancienne wyverne verte", "Brassard de santé", "Manteau de ronces", "Ancien serpent", "Plastron en platine", "Guerrier elfe", "Cavalier elfe", "Mage elfe", "Rappel", "Mémorial", "Écrasement", "Bottes florales", "Plastron en cuir", "Plastron en fer", "Bûcheron", "Hache de bûcheron", "Trèfle", "Leprechaun", "Scierie", "Chaudron de bonne fortune", "Rétablissement", "Ville", "Défrichage"]);
    };
};