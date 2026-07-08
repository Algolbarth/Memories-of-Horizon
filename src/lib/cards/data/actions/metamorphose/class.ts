import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';
import { Druid } from '$lib/cards/class/druid';

export class Metamorphose extends Action {
    name = "Métamorphose";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Druide"]);

        this.addText(`Quand posé : Transforme en sa forme alternative une créature de famille Druide sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Druid) {
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
                    return target instanceof Druid;
                },
                (target: Druid) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Druid) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Druid) => {
        this.targeting(target);

        target.transform(target.alternative_form);

        this.move("Défausse");
        this.pose();
    };
};