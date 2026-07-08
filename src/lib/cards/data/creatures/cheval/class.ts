import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Cheval extends Creature {
    name = "Cheval";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Bête"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Vitesse").init(1);

        this.addText(`Quand posé : Augmente de 1 la vitesse d'une créature sur votre terrain.`);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature;
                    },
                    (target: Creature) => {
                        this.useEffect(target);
                        this.closeInterface();
                    }
                );
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
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

    useEffect = (target: Creature | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            target.stat("Vitesse").increase(1);
        }

        this.move("Terrain");
        this.pose();
    };
};