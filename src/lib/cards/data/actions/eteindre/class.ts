import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Eteindre extends Action {
    name = "Éteindre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Eau", 25]]);

        this.addText([
            `Quand posé : Réduit de 60 la force d'une créature sur le terrain adverse.`,
            `Vide la jauge critique de cette créature.`]);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && (card.stat("Force").value() > 0 || card.stat("Critique").value() > 0)) {
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
                    return target instanceof Creature && (target.stat("Force").value() > 0 || target.stat("Critique").value() > 0);
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && (card.stat("Force").value() > 0 || card.stat("Critique").value() > 0)) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.stat("Force").decrease(60);
        target.stat("Critique").set(0);

        this.move("Défausse");
        this.pose();
    };
};