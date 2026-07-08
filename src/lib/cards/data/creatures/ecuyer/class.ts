import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Knight } from '$lib/cards/class/knight';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Ecuyer extends Creature {
    name = "Écuyer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Augmente de 50 la force d'une créature de famille Chevalier sur votre terrain.`,
            `Si cette créature est à terre : Augmente de 35 la constitution de cette créature à la place.`]);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Knight) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Knight;
                    },
                    (target: Knight) => {
                        this.useEffect(target);
                        this.closeInterface();
                    });
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Knight) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
        else {
            this.useEffect();
        }
    };

    useEffect = (target: Knight | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            if (target.trait("À terre").value()) {
                target.stat("Constitution").increase(35);
            }
            else {
                target.stat("Force").increase(50);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};