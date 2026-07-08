import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Unit } from '$lib/cards/class/unit';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class BriseGarde extends Action {
    name = "Brise garde";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText(`Quand posé : Retire la garde d'une unité sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Garde").value() > 0) {
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
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Unit && card.stat("Garde").value() > 0) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Garde").set(0);

        this.move("Défausse");
        this.pose();
    };
};