import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Cauteriser extends Action {
    name = "Cautériser";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Feu", 10]]);

        this.addText(`Quand posé : Fixe la vitalité d'une créature sur le terrain à la santé de cette créature.`);
    };

    canUse = () => {
        if (this.owner().is_player) {
            for (const card of this.owner().zone("Terrain").cards) {
                if (card instanceof Creature && card.isDamaged()) {
                    return true;
                }
            }
        }
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.isDamaged()) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain"), this.adversary().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature && target.isDamaged();
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.isDamaged()) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.stat("Vitalité").set(target.stat("Santé").value());

        this.move("Défausse");
        this.pose();
    };
};