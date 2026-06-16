import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';
import { Building } from '$lib/cards/class/building';

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

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            for (const card of this.owner().zone("Terrain").cards) {
                if (check == false && card instanceof Building && card.stat("Portée").value() > 0) {
                    check = true;
                }
            }

            if (check) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect(undefined);
            }
        }
        else {
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
                this.useEffect(undefined);
            }
        }
    };

    useEffect = (target: Building | undefined) => {
        if (target != undefined) {
            this.targeting(target);

            target.stat("Portée").increase(15);
            target.stat("Endurance").increase(10);
        }

        this.move("Terrain");
        this.pose();
    };
};