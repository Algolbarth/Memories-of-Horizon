import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Building } from '$lib/cards/class/building';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Pilote extends Creature {
    name = "Pilote";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé : Augmente de 1 la maîtrise d'un bâtiment de famille Véhicule sur votre terrain.`);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building && card.isFamily("Véhicule")) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Building && target.isFamily("Véhicule");
                    },
                    (target: Building) => {
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
            if (target == undefined && card instanceof Building && card.isFamily("Véhicule")) {
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

    useEffect = (target: Building | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            target.stat("Initiative").turn += 1;
            target.stat("Maîtrise").turn += 1;
        }

        this.move("Terrain");
        this.pose();
    };
};