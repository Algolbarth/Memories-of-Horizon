import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Arrogance extends Action {
    name = "Arrogance";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.addText(`Quand posé : Augmente d'autant la constitution et la force d'une créature sur votre terrain que 10 fois le charisme de cette créature.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Charisme").value() > 0) {
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
                    return target instanceof Creature && target.stat("Charisme").value() > 0;
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.stat("Charisme").value() > 0) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.stat("Constitution").increase(10 * target.stat("Charisme").value());
        target.stat("Force").increase(10 * target.stat("Charisme").value());

        this.move("Défausse");
        this.pose();
    };
};