import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class ParcheminDeSagesse extends Item {
    name = "Parchemin de sagesse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Quand posé : Pioche autant de carte que votre intelligence cumulée.`);
    };

    canUse = () => {
        if (this.owner().totalIntelligence() > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.owner().draw(this.owner().totalIntelligence());

        this.move("Défausse");
        this.pose();
    };
};