import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Spell } from '$lib/cards/class/spell';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class SavoirAncestral extends Spell {
    name = "Savoir ancestral";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Nature", 12]]);

        this.addText([
            `Quand posé : Augmente de 5 l'intelligence d'une créature sur votre terrain.`,
            `[sorcery {25, Augmente de 10 l'intelligence à la place.}]`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        if (this.owner().ressource("Mana").total() >= 25) {
            this.owner().ressource("Mana").spend(25);
            target.stat("Intelligence").increase(10);
        }
        else {
            target.stat("Intelligence").increase(5);
        }

        this.move("Défausse");
        this.pose();
    };
};