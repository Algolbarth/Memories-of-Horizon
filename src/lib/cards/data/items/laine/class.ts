import type { Unit } from '$lib/cards/class/unit';
import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Laine extends Item {
    name = "Laine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Augmente de 5 l'endurance et la résistance d'une unité sur votre terrain.`);
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

        target.stat("Endurance").increase(5);
        target.stat("Résistance").increase(5);

        this.move("Défausse");
        this.pose();
    };
};