import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class DoseMortelle extends Action {
    name = "Dose mortelle";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.addText(`Quand posé : Détruit une créature empoisonnée ayant sa vitalité inférieure ou égale au produit de son poison et de sa toxicité.`);
    };

    canUse = () => {
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Poison").value() * card.stat("Toxicité").value() >= card.stat("Vitalité").value()) {
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
                    return target instanceof Creature && target.stat("Poison").value() * target.stat("Toxicité").value() >= target.stat("Vitalité").value();
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Poison").value() * card.stat("Toxicité").value() >= card.stat("Vitalité").value()) {
                return true;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.destroy();

        this.move("Défausse");
        this.pose();
    };
};