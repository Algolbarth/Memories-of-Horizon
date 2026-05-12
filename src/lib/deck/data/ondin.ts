import type { System } from "$lib/system/class";
import { StandardDeck } from "../standard";

export class Deck_Ondin extends StandardDeck {
    constructor(system: System) {
        super(system, "Deck Ondins", ["Mer", "Ondin", "Consul", "Sénateur", "Ondin des rivières", "Bassin de reproduction", "Pain", "Trésor", "Marchand", "Écoulement", "Fontaine de bambou", "Trident", "Hydratation", "Milieu aquatique", "Druide des récifs (forme ondin)", "Tortue géante", "Cycle de l'eau", "Tir hydraulique", "Canon à eau", "Palmes", "Sardines en boîte", "Vague déferlante", "Raz-de-marée", "Wyverne marine", "Grande wyverne marine", "Ancienne wyverne marine", "Élémentaire d'eau", "Élémentaire marin", "Élémentaire océanique", "Conque", "Épaulard", "Baleine", "Dauphin", "Noyade", "Inondation", "Mage des eaux", "Baguette des marées", "Capitale", "Archimage", "Aquamancien"]);
    };
};