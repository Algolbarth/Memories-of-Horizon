import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Incantation extends Action {
    name = "Incantation";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.addText([
            `Quand posé : Produit autant de mana que la magie d'une créature dégagée sur votre terrain.`,
            `Engage cette créature pendant ce tour.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Magie").value() > 0 && card.stat("Engagement").value() == 0) {
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
                    return target instanceof Creature && target.stat("Magie").value() > 0 && target.stat("Engagement").value() == 0;
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.stat("Magie").value() > 0 && card.stat("Engagement").value() == 0) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        this.owner().ressource("Mana").produce(target.stat("Magie").value());
        target.stat("Engagement").fix(1);

        this.move("Défausse");
        this.pose();
    };
};