import type { System } from '$lib/system/class';
import { Card } from './card';

export class Location extends Card {
    type = "Lieu";

    constructor(system: System) {
        super(system);

        this.trait("Limité").init(true);
    };

    canUse = () => {
        if (this.owner().zone("Région").isNotFull()) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        this.move("Région");
        this.pose();
    };

    canRead = (card: Card) => {
        return true;
    };
};