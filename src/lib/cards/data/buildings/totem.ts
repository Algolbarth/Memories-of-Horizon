import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Totem extends Building {
    name = "Totem";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Terre", 5]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand posé : Se place sur le terrain adverse.`);
        this.addText(`Quand meurt sur le terrain : Stocke 5 or et 5 terre chez l'adversaire.`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.move("Terrain", this.adversary());
        this.pose();
    };

    dieEffect = () => {
        if (this.isArea("Terrain")) {
            this.adversary().ressource("Or").stock(5);
            this.adversary().ressource("Terre").stock(5);
        }
    };
};