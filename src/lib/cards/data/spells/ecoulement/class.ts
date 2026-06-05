import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';

export class Ecoulement extends Spell {
    name = "Écoulement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Eau", 12]]);

        this.addText([
            `Quand posé : Augmente de 2 votre production d'eau.`,
            `[sorcery {25, Augmente de 5 votre production d'eau à la place.}]`]);
    };

    useEffect = () => {
        if (this.owner().ressource("Mana").total() >= 25) {
            this.owner().ressource("Mana").spend(25);
            this.owner().ressource("Eau").increase(5);
        }
        else {
            this.owner().ressource("Eau").increase(2);
        }

        this.move("Défausse");
        this.pose();
    };
};