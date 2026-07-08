import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Reine extends Creature {
    name = "Reine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 110]]);

        this.initFamily(["Humain", "Commandant"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(10);

        this.addText(`Quand posé : Augmente de 100 la constitution et la force d'une créature sur votre terrain.`);
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
                    });
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

            target.stat("Constitution").increase(100);
            target.stat("Force").increase(100);
        }

        this.move("Terrain");
        this.pose();
    };
};