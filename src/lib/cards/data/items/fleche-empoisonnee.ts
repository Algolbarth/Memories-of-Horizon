import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class FlecheEmpoisonnee extends Item {
    name = "Flèche empoisonnée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.addText([
            `Quand posé : Augmente de 5 le poison d'une créature sur le terrain adverse.`,
            `Augmente de 10 la toxicité de cette créature.`]);
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

        target.stat("Poison").increase(5);
        target.stat("Toxicité").increase(10);

        this.move("Défausse");
        this.pose();
    };
};