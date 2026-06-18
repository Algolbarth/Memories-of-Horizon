import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class PotionDeMana extends Item {
    name = "Potion de mana";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat(601, "Infusion", 5);

        this.addText(`Quand posé : Produit 1 mana pour chaque valeur d'infusion.`);
        this.addText(`[details {Produit {card.stat("Infusion").value()} mana.}]`);
    };

    useEffect = () => {
        this.owner().ressource("Mana").produce(this.stat("Infusion").value());

        this.move("Défausse");
        this.pose();
    };
};