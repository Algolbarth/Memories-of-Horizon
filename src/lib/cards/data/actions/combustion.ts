import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Combustion extends Action {
    name = "Combustion";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Feu", 12]]);

        this.addText(`Quand posé : Inflige autant de dégâts physiques à une unité sur le terrain adverse que 5 fois la brûlure de cette unité.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card.stat("Brûlure").value() > 0) {
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
                    return target.stat("Brûlure").value() > 0;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (card.stat("Brûlure").value() > 0) {
                return true;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.physicalDamage(5 * target.stat("Brûlure").value(), this);

        this.move("Défausse");
        this.pose();
    };
};