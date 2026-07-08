import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

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

    userInterface = () => {
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
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Pioche 1 créature de famille non-Bête pour chaque créature de famille Bête sur votre terrain"],
                        () => {
                            this.useEffect("draw");
                            this.closeInterface();
                        }),
                    new Button(["Pioche 1 créature de famille Bête pour chaque créature de famille non-Bête sur votre terrain"],
                        () => {
                            this.useEffect("discover");
                            this.closeInterface();
                        })]);
        }
        else if (check_beast) {
            this.useEffect("no-beast");
        }
        else {
            this.useEffect("beast");
        }
    };

    autoUse = () => {
        let check_beast: number = 0;
        let check_no_beast: number = 0;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                if (card.isFamily("Bête")) {
                    check_beast++;
                }
                else {
                    check_no_beast++;
                }
            }
        }

        if (check_beast > 0 && check_beast >= check_no_beast) {
            this.useEffect("no-beast");
        }
        else if (check_no_beast > 0) {
            this.useEffect("beast");
        };
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