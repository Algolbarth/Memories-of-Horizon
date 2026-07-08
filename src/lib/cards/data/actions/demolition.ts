import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Demolition extends Action {
    name = "Démolition";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.addText(`Quand posé : Détruit un bâtiment sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Building && card.canBeDestroyed()) {
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
                    return target instanceof Building && target.canBeDestroyed();
                },
                (target: Building) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Building && card.canBeDestroyed()) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Building) => {
        this.targeting(target);

        target.destroy();

        this.move("Défausse");
        this.pose();
    };
};