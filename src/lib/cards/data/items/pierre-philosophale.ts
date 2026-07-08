import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';

export class PierrePhilosophale extends Item {
    name = "Pierre philosophale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText(`Quand posé : Dépense jusqu'à 5 flux pour augmenter d'autant votre production d'or.`);
    };

    canUse = () => {
        if (this.owner().ressource("Flux").total() > 0) {
            return true;
        }
        return false;
    };

    useEffect = () => {
        let buff: number;

        if (this.owner().ressource("Flux").total() >= 5) {
            buff = 5;

            this.owner().ressource("Or").increase(5);
            this.owner().ressource("Flux").spend(5);
        }
        else {
            buff = this.owner().ressource("Flux").total();

            this.owner().ressource("Or").increase(this.owner().ressource("Flux").total());
            this.owner().ressource("Flux").spend(this.owner().ressource("Flux").total());
        }

        for (const card of this.owner().zone("Terrain").cards) {
            if (card.name == "Ouroboros") {
                card.stat("Constitution").increase(buff);
                card.stat("Force").increase(buff);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};