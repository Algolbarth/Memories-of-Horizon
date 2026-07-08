import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Hydratation extends Action {
    name = "Hydratation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Eau", 8]]);

        this.addText([
            `Quand posé : Augmente de 15 la constitution et la force d'une créature d'élément Eau sur votre terrain.`,
            `[source {15, Augmente de 30 à la place.}]`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isElement("Eau")) {
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
                    return target instanceof Creature && target.isElement("Eau");
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.isElement("Eau")) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        let value: number = 15;

        if (this.owner().ressource("Eau").total() >= 15) {
            this.owner().ressource("Eau").spend(15);
            value = 30;
        }

        target.stat("Constitution").increase(value);
        target.stat("Force").increase(value);

        this.move("Défausse");
        this.pose();
    };
};