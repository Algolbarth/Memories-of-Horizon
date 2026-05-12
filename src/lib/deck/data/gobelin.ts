import type { System } from "$lib/system/class";
import { StandardDeck } from "../standard";

export class Deck_Gobelin extends StandardDeck {
    constructor(system: System) {
        super(system, "Deck Gobelins", ["Torche", "Terres ignées", "Boule de feu", "Marchand", "Trésor", "Gobelin", "Chef de clan", "Cri de guerre", "Pluie de feu", "Wyverne rouge", "Grande wyverne rouge", "Ancienne wyverne rouge", "Masse d'armes sulfurique", "Épée de platine", "Warg", "Warg alpha", "Warg en chasse", "Frappe", "Lac de lave", "Pain", "Poulet rôti", "Épée de platine", "Guerrier gobelin", "Piquier gobelin", "Mage de feu", "Baguette explosive", "Bottes ignifugées", "Épée de cuivre", "Épée enflammée", "Bière", "Sang chaud", "Hache lourde", "Épée de fer", "Hache de cuivre", "Hache de fer", "Lance de fer", "Hache de platine", "Pugiliste", "Bagarreur", "Cor de guerre"]);
    };
};