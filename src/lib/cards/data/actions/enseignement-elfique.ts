import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class EnseignementElfique extends Action {
    name = "Enseignement elfique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5], ["Nature", 5]]);

        this.initFamily(["Elfe"]);

        this.addText([
            `Quand posé : Augmente de 5 la magie d'une créature de famille Elfe sur votre terrain.`,
            `[resolve {20, Augmente de 10 la magie à la place.}]`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFamily("Elfe")) {
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
                    return target instanceof Creature && target.isFamily("Elfe");
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.isFamily("Elfe")) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        if (this.owner().totalIntelligence() >= 20) {
            target.stat("Magie").increase(10);
        }
        else {
            target.stat("Magie").increase(5);
        }

        this.move("Défausse");
        this.pose();
    };
};