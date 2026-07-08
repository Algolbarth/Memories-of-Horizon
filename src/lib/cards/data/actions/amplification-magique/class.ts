import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Unit } from '$lib/cards/class/unit';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class AmplificationMagique extends Action {
    name = "Amplification magique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.addText(`Quand posé : Augmente de 25 la magie d'une unité de famille Mage sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card.isFamily("Mage")) {
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
                    return target.isFamily("Mage");
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Unit && card.isFamily("Mage")) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Magie").increase(25);

        this.move("Défausse");
        this.pose();
    };
};