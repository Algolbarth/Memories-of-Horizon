import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Menace extends Action {
    name = "Menace";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Augmente de 5 le charisme d'une créature sur le terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        if (this.owner().is_player) {
            for (const card of this.adversary().zone("Terrain").cards) {
                if (card instanceof Creature) {
                    return true;
                }
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain"), this.adversary().zone("Terrain")],
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

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Charisme").increase(5);

        this.move("Défausse");
        this.pose();
    };
};