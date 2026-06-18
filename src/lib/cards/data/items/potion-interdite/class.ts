import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class PotionInterdite extends Item {
    name = "Potion interdite";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat(601, "Infusion", 5);

        this.addText([
            `Quand posé : Génère {card:Homonculus} sur votre terrain.`,
            `Fixe la constitution et la force de cette carte à sa valeur d'infusion.`]);
        this.addText(`[details {Fixe à {card.stat("Infusion").value()} la constitution et la force de {card:Homonculus}.}]`);
    };

    useEffect = () => {
        let homonculus = this.owner().getCard("Homonculus");

        homonculus.stat("Constitution").init(this.stat("Infusion").value());
        homonculus.stat("Force").init(this.stat("Infusion").value());

        homonculus.add("Terrain");
        this.move("Défausse");
        this.pose();
    };
};