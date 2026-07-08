import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class Nourrir extends Action {
    name = "Nourrir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addChoice([
            `Pioche 1 carte de famille Nourriture pour chaque créature sur votre terrain.`,
            `Soigne 5 blessures à toutes les créatures sur votre terrain.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        let check: boolean = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isDamaged()) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this).addChoice([
                new Button(
                    ["Pioche 1 carte de famille Nourriture pour chaque créature sur votre terrain"],
                    () => {
                        this.useEffect("draw");
                        this.closeInterface();
                    }),
                new Button(
                    ["Soigne 5 blessures à toutes les créatures sur votre terrain"],
                    () => {
                        this.useEffect("heal");
                        this.closeInterface();
                    })
            ]);
        }
        else {
            this.useEffect("draw");
        }
    };

    autoUse = () => {
        let check: boolean = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isDamaged()) {
                check = true;
            }
        }

        if (check) {
            this.useEffect("heal");
        }
        else {
            this.useEffect("draw");
        }
    };

    useEffect = (choice: string) => {
        if (choice == "draw") {
            let nb_creature: number = 0;
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    nb_creature++;
                }
            }

            let readCondition = (card: Card) => {
                if (card.isFamily("Nourriture")) {
                    return true;
                }
                return false;
            };
            this.owner().draw(nb_creature, readCondition);
        }
        else if (choice == "heal") {
            let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
            for (const card of battlefield) {
                if (card instanceof Creature) {
                    card.heal(5);
                }
            }
        }

        this.move("Défausse");
        this.pose();
    };
};