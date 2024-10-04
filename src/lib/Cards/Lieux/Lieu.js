import { Card } from '../Card.js';

export class Lieu extends Card {
    type = "Lieu";

    useEffect = function () {
        this.move("Lieux");
        this.pose();
    };

    condition = function (card) {
        return true;
    };
}