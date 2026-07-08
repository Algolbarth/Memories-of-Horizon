import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Malefice extends Action {
    name = "Maléfice";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Transforme en {card:Grenouille} une créature sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature) {
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

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.transform("Grenouille");

        this.move("Défausse");
        this.pose();
    };
};