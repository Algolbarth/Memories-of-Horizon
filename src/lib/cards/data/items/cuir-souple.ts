import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Equipment } from '$lib/cards/class/equipment';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class CuirSouple extends Action {
    name = "Cuir souple";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.addText(`Quand posé : Augmente de 30 la constitution d'un objet de famille Armure dans votre inventaire.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card instanceof Equipment && card.isFamily("Armure")) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Inventaire")],
                (target: Card) => {
                    return target instanceof Equipment && target.isFamily("Armure");
                },
                (target: Equipment) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Inventaire").cards) {
            if (target == undefined && card instanceof Equipment && card.isFamily("Armure")) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Equipment) => {
        this.targeting(target);

        target.equipStat("Constitution").increase(30);

        this.move("Défausse");
        this.pose();
    };
};