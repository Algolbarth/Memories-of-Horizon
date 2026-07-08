import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Knight } from '$lib/cards/class/knight';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class MontureDeChevalier extends Creature {
    name = "Monture de chevalier";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand posé : Place dans l'inventaire et transforme en sa forme alternative une créature de famille Chevalier à terre sur votre terrain.`);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Knight && card.trait("À terre").value()) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Knight && target.trait("À terre").value();
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
            if (target == undefined && card instanceof Knight && card.trait("À terre").value()) {
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

            target.move("Inventaire");
            target.transform(target.alternative_form);
        }

        this.move("Terrain");
        this.pose();
    };
};