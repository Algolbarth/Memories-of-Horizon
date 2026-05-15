import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class VoleurDeChevaux extends Creature {
    name = "Voleur de chevaux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(20);

        this.addText(`Quand posé : [prime {10, Augmente de 1 sa vitesse.}]`);
        this.addText(`Quand attaque : Augmente de 5 sa vente en or.`);
    };

    useEffect = () => {
        if (this.owner().ressource("Or").total() >= 10) {
            this.owner().ressource("Or").spend(10);

            this.stat("Vitesse").increase(1);
        }

        this.move("Terrain");
        this.pose();
    };

    fightEffect = () => {
        this.getSale("Or").increase(5);
    };
};