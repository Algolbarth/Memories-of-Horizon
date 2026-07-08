import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Negociant extends Creature {
    name = "Négociant";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Réduit de 10 le coût en or d'une carte sur votre pile et la verrouille.`);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Pile").cards) {
            if (card.costTotal() > 0) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Pile")],
                    (target: Card) => {
                        return target.costTotal() > 0;
                    },
                    (target: Creature) => {
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

        for (const card of this.owner().zone("Pile").cards) {
            if (target == undefined && card.costTotal() > 0) {
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

    useEffect = (target: Card | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            target.getCost("Or").decrease(10);
            target.lock();
        }

        this.move("Terrain");
        this.pose();
    };
};