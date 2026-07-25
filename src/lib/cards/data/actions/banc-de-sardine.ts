import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';

export class BancDeSardine extends Action {
    name = "Banc de sardine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Eau", 10]]);

        this.initFamily(["Poisson"]);

        this.addText(`Quand posé : Génère 5 {card:Sardine} dans votre inventaire.`);
    };

    useEffect = () => {
        for (let i = 1; i <= 5; i++) {
            this.owner().getCard("Sardine").add("Inventaire");
        }

        this.move("Défausse");
        this.pose();
    };
};