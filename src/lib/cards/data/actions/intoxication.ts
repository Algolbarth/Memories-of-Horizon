import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Intoxication extends Action {
    name = "Intoxication";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.addText(`Quand posé : Augmente de 5 la toxicité d'une créature empoisonnée sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Poison").value() > 0) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature && target.stat("Poison").value() > 0;
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.stat("Poison").value() > 0) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.stat("Toxicité").increase(5);

        this.move("Défausse");
        this.pose();
    };
};