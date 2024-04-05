import { Chapter } from '../Chapter.js';

export class Lv2_Mur extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 30);

        this.addStep(20, "Plaine", ["Soldat", "Garde"], ["Un mur vous barre la route tandis que des gardes s'avancent vers vous."]);
        this.addStep(20, "Plaine", ["Mur de brique", "Soldat", "Soldat"]);
    }
}

export class Lv2_Bandits extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 30);

        this.addStep(20, "Forêt", ["Flèche en bois", "Flèche en bois", "Flèche en bois"], ["Tandis que vous voyagez sur une route, on se met à vous tirer dessus."]);
        this.addStep(20, "Forêt", ["Bandit", "Bouclier en cuir", "Bandit", "Épée de cuivre"], ["Des bandits vous tendent une embuscade."]);
    }
}

export class Lv2_Ferme extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 30);

        this.addStep(20, "Plaine", ["Vache", "Vache", "Chien"], ["Une colonne de vache vous bloque la route.", "Des fermiers semblent se disputer la propriété du bétail tout en vous empêchant de passer."]);
        this.addStep(20, "Plaine", ["Vache", "Vache", "Vache"]);
        this.addStep(20, "Plaine", ["Fermier", "Fermier"]);
    }
}

export class Lv2_Raido extends Chapter {
    boss = true;

    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 30);

        this.addStep(20, "Plaine", ["Bandit", "Entraînement", "Bandit", "Entraînement"], ["Un clan de bandit s'est installé dans une vallée.", "Il s'agirait du clan de Raido à en croire des rescapés d'un village voisin.", "Lui et ses hommes sont connus pour rivaliser avec des soldats."]);
        this.addStep(20, "Plaine", ["Bandit", "Bandit"]);
        this.addStep(20, "Plaine", ["Raido, chef brutal", "Bandit", "Bandit"]);
    }
}