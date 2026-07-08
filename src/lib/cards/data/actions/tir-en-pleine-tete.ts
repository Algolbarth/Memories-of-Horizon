import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class TirEnPleineTete extends Action {
    name = "Tir en pleine tête";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Inflige autant de dégâts spéciaux à une créature sur le terrain adverse que 10 fois le charisme de cette créature.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Charisme").value() > 0) {
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
                    return target instanceof Creature && target.stat("Charisme").value() > 0;
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().adversary().zone("Terrain").cards) {
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

        target.specialDamage(target.stat("Charisme").value() * 10, this);

        this.move("Défausse");
        this.pose();
    };
};