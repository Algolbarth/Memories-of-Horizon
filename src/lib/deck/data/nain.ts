import type { System } from "$lib/system/class";
import { StandardDeck } from "../standard";

export class Deck_Nain extends StandardDeck {
    constructor(system: System) {
        super(system, "Deck Nains", ["Montagne", "Nain", "Archonte", "Pomme de terre", "Pain", "Marchand", "Carrière de pierre", "Trésor", "Masse de pierre", "Masse de fer", "Masse de platine", "Bouclier en cuir", "Bouclier de fer", "Bouclier de platine", "Bottes de montagnard", "Peau de pierre", "Bouclier de roche", "Muraille de marbre", "Éboulement", "Wyverne terrestre", "Grande wyverne terrestre", "Ancienne wyverne terrestre", "Ténacité", "Bulette", "Bulette fouisseuse", "Bulette brise-roc", "Architecte", "Plan de construction", "Brique", "Ciment", "Catapulte", "Soldat nain", "Tour de mage", "Géomarteau", "Défense ultime", "Défenseur de la cité", "Garnison des monts", "Wyverne des toits", "Mage terrestre", "Tour de siège", "Rétablissement", "Mémorial", "Rappel", "Ville", "Ériger les frontières", "Chambre du trésor", "Émeutier", "Lutteur", "Géomancien", "Barbelé", "Pot de peinture", "Consolider", "Élémentaire de briques", "Contre", "Casque à pic", "Druide des montagnes (forme nain)", "Gantelets de fer", "Laine", "Plaque d'armure", "Blason", "Terrine de porc", "Ambidextrie"]);
    };
};