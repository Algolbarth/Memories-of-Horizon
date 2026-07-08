import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class HerbesCuratives extends Item {
    name = "Herbes curatives";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10], ["Nature", 10]]);

        this.addText(`Quand posé : Retire le poison et la brûlure d'une créature sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.stat("Poison").value() > 0 || card.stat("Brûlure").value() > 0)) {
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
                    return target instanceof Creature && (target.stat("Poison").value() > 0 || target.stat("Brûlure").value() > 0);
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && (card.stat("Poison").value() > 0 || card.stat("Brûlure").value() > 0)) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.stat("Poison").set(0);
        target.stat("Brûlure").set(0);

        this.move("Défausse");
        this.pose();
    };
};