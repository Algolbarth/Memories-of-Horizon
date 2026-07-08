import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Unit } from '$lib/cards/class/unit';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Fondre extends Action {
    name = "Fondre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.addText(`Quand posé : Réduit de 25 l'endurance et la résistance d'une unité sur le terrain adverse.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card.stat("Endurance").value() > 0 || card.stat("Résistance").value() > 0) {
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
                    return target.stat("Endurance").value() > 0 || target.stat("Résistance").value() > 0;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Unit && (card.stat("Endurance").value() > 0 || card.stat("Résistance").value() > 0)) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Endurance").decrease(25);
        target.stat("Résistance").decrease(25);

        this.move("Défausse");
        this.pose();
    };
};