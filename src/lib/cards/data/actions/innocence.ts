import type { System } from '$lib/system/class';
import { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Innocence extends Action {
    name = "Innocence";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText(`Quand posé : Retire le charisme d'une unité sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card.stat("Charisme").value() > 0) {
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
                    return target.stat("Charisme").value() > 0;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Unit && card.stat("Charisme").value() > 0) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Charisme").set(0);

        this.move("Défausse");
        this.pose();
    };
};