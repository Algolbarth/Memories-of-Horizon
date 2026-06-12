import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import Use from './use.svelte';

export class ParlerAuxBetes extends Action {
    name = "Parler aux bêtes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addChoice([
            `Pioche 1 créature de famille non-Bête pour chaque créature de famille Bête sur votre terrain.`,
            `Pioche 1 créature de famille Bête pour chaque créature de famille non-Bête sur votre terrain.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    select = () => {
        let check_beast: boolean = false;
        let check_no_beast: boolean = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                if (card.isFamily("Bête")) {
                    check_beast = true;
                }
                else {
                    check_no_beast = true;
                }
            }
        }

        if (check_beast && check_no_beast) {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("beast");
            }
        }
        else if (check_beast) {
            this.useEffect("no-beast");
        }
        else {
            this.useEffect("beast");
        }

    };

    useEffect = (choice: string) => {
        if (choice == "beast") {
            let nb_creature: number = 0;
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature && !card.isFamily("Bête")) {
                    nb_creature++;
                }
            }

            console.log(nb_creature);
            let readCondition = (card: Card) => {
                if (card.isFamily("Bête")) {
                    return true;
                }
                return false;
            };
            this.owner().draw(nb_creature, readCondition);
        }
        else if (choice == "no-beast") {
            let nb_creature: number = 0;
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature && card.isFamily("Bête")) {
                    nb_creature++;
                }
            }

            console.log(nb_creature);
            let readCondition = (card: Card) => {
                if (!card.isFamily("Bête")) {
                    return true;
                }
                return false;
            };
            this.owner().draw(nb_creature, readCondition);
        }

        this.move("Défausse");
        this.pose();
    };
};