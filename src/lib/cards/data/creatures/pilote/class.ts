import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';
import { Building } from '$lib/cards/class/building';

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

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            for (const card of this.owner().zone("Terrain").cards) {
                if (check == false && card instanceof Building && card.isFamily("Véhicule")) {
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
                if (target == undefined && card instanceof Building && card.isFamily("Véhicule")) {
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

            target.stat("Initiative").turn += 1;
            target.stat("Maîtrise").turn += 1;
        }

        this.move("Terrain");
        this.pose();
    };
};