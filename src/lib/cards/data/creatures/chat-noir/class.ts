import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ChatNoir extends Creature {
    name = "Chat noir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(3);

        this.addText(`Quand posé : Réduit de 5 votre production d'or.`);
        this.addText(`Quand attaque : Produit 1 or, stocke 1 or et augmente de 1 votre production d'or.`);
    };

    canUse = () => {
        if (this.owner().ressource("Or").production >= 5 && this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().ressource("Or").decrease(5);
    };

    fightEffect = () => {
        this.owner().ressource("Or").produce(1);
        this.owner().ressource("Or").stock(1);
        this.owner().ressource("Or").increase(1);
    };
};