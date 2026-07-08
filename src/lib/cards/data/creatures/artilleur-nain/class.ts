import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Building } from '$lib/cards/class/building';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class ArtilleurNain extends Creature {
    name = "Artilleur nain";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20], ["Terre", 20]]);

        this.initFamily(["Nain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);
        this.stat("Endurance").init(3);

        this.addText([
            `Quand posé : Augmente de 15 la portée d'un bâtiment avec portée sur votre terrain.`,
            `Augmente de 10 l'endurance de ce bâtiment.`]);
    };

    userInterface = () => {

        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building && card.stat("Portée").value() > 0) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Building && target.stat("Portée").value() > 0;
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
            if (target == undefined && card instanceof Building && card.stat("Portée").value() > 0) {
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

            target.stat("Portée").increase(15);
            target.stat("Endurance").increase(10);
        }

        this.move("Terrain");
        this.pose();
    };
};