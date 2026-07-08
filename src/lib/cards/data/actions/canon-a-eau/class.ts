import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class CanonAEau extends Action {
    name = "Canon à eau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.addText([
            `Quand posé : Inflige 100 dégâts spéciaux à une unité sur le terrain adverse.`,
            `[source_inf {1, Inflige 2 dégâts spéciaux supplémentaires.}]`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        this.useEffect(this.adversary().zone("Terrain").cards[0]);
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        let value = 100;

        value += 2 * this.owner().ressource("Eau").total();
        this.owner().ressource("Eau").spend(this.owner().ressource("Eau").total());

        target.specialDamage(value, this);

        this.move("Défausse");
        this.pose();
    };
};