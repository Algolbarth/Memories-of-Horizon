import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/class';

export class Empereur extends Creature {
    name = "Empereur";

    constructor(system: System) {
        super(system);

        this.init([["Or", 500]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(100);
        this.stat("Force").init(100);

        this.addText([
            `Quand posé : Augmente de 10 sa constitution et sa force pour chaque créature sur votre terrain.`,
            `Augmente de 10 la constitution et la force de toutes les créatures sur votre terrain.`]);
        this.addText([
            `Quand une créature alliée est posée : Si sur le terrain : Augmente de 10 sa constitution et sa force.`,
            `Augmente de 10 la constitution et la force de cette créature.`]);
    };

    useEffect = () => {
        let battlefield = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                this.stat("Constitution").increase(10);
                this.stat("Force").increase(10);

                card.stat("Constitution").increase(10);
                card.stat("Force").increase(10);
            }
        }

        this.move("Terrain");
        this.pose();
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && card instanceof Creature && this.isAlly(card)) {
            this.stat("Constitution").increase(10);
            this.stat("Force").increase(10);

            card.stat("Constitution").increase(10);
            card.stat("Force").increase(10);
        }
    };
};