import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import type { Unit } from '$lib/cards/class/unit';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class PluieDeMeteorites extends Action {
    name = "Pluie de météorites";

    constructor(system: System) {
        super(system);

        this.init([["Or", 120]]);

        this.initFamily(["Spatial"]);

        this.addChoice([
            `Stocke 5 flux.`,
            `Inflige 20 dégâts spéciaux à toutes les unités sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.owner().is_player || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Stocke 5 flux"],
                        () => {
                            this.useEffect("stockage");
                            this.closeInterface();
                        }),
                    new Button(["Inflige 20 dégâts spéciaux à toutes les unités sur le terrain adverse"],
                        () => {
                            this.useEffect("damage");
                            this.closeInterface();
                        })]);
        }
        else {
            this.useEffect("stockage");
        }
    };

    autoUse = () => {
        this.useEffect("damage");
    };

    useEffect = (choice: string) => {
        if (choice == "stockage") {
            this.owner().ressource("Flux").stock(5);
        }
        else if (choice == "damage") {
            let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(20, this);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};