import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';

export class Ecoulement extends Spell {
    name = "Écoulement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Eau", 8]]);

        this.addText([
            `Quand posé : Augmente de 3 votre production d'eau.`,
            `[sorcery {10, Augmente de 5 votre production d'eau à la place.}]`]);
    };

    useEffect = () => {
        if (this.owner().ressource("Mana").total() >= 10) {
            this.owner().ressource("Mana").spend(10);
            this.owner().ressource("Eau").increase(5);
        }
        else {
            this.owner().ressource("Eau").increase(3);
        }

        this.move("Défausse");
        this.pose();
    };
};