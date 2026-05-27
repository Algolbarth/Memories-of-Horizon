import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';
import { Creature } from '$lib/cards/class/creature';

export class CouteauDeChasse extends Item {
    name = "Couteau de chasse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addChoice([
            `Détruit une créature de famille Bête sur votre terrain.`,
            `Produit 1 or pour chaque créature de famille Bête dans votre défausse.`]);
    };

    canUse = () => {
        for (const zone of ["Terrain", "Défausse"]) {
            for (const card of this.owner().zone(zone).cards) {
                if (card instanceof Creature && card.isFamily("Bête") && (card.canBeDestroyed() || zone == "Défausse")) {
                    return true;
                }
            }
        }
        return false;
    };

    select = () => {
        let check: boolean = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFamily("Bête") && card.canBeDestroyed()) {
                check = true;
            }
        }

        if (check) {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
        }
        else {
            this.useEffect("production");
        }
    };

    useEffect = (choice: string, target: Unit | undefined = undefined) => {
        if (choice == "production") {
            let nb_beast = 0;
            for (const card of this.owner().zone("Défausse").cards) {
                if (card instanceof Creature && card.isFamily("Bête")) {
                    nb_beast++;
                }
            }
            this.owner().ressource("Or").produce(nb_beast);
        }
        else if (choice == "destroy" && target != undefined) {
            this.targeting(target);

            target.destroy();
        }

        this.move("Défausse");
        this.pose();
    };
};