import { Card } from '$lib/cards/class/card';
import { Unit } from '$lib/cards/class/unit';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Rappel extends Action {
    name = "Rappel";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText([
            `Quand posé : Place sur votre pile une carte située dans votre défausse.`,
            `Si c'est une unité, fixe à 1 la santé de cette carte.`]);
    };

    canUse = () => {
        if (this.owner().zone("Défausse").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Défausse")],
                (target: Card) => {
                    return true;
                },
                (target: Card) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        this.useEffect(this.owner().zone("Défausse").cards[0]);
    };

    useEffect = (target: Card) => {
        this.targeting(target);

        target.move("Pile");
        if (target instanceof Unit) {
            target.stat("Santé").init(1);
        }

        this.move("Défausse");
        this.pose();
    };
};