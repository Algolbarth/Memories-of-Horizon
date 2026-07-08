import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Renforcement extends Action {
    name = "Renforcement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Augmente de 15 la constitution d'une unité sur votre terrain.`);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        this.useEffect(this.owner().zone("Terrain").cards[0]);
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Constitution").increase(15);

        this.move("Défausse");
        this.pose();
    };
};