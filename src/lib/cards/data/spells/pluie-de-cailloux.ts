import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Spell } from '$lib/cards/class/spell';
import type { Unit } from '$lib/cards/class/unit';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class PluieDeCailloux extends Spell {
    name = "Pluie de cailloux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.addChoice([
            `Remplit votre terrain d'{card:Élémentaire de cailloux}.`,
            `Inflige 5 dégâts spéciaux à toutes les unités sur le terrain adverse.`],
            undefined,
            `[sorcery {30, Active les deux effets à la place.}]`
        );
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull() || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        if (this.owner().ressource("Mana").total() >= 30) {
            this.useEffect();
        }
        else {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Remplit votre terrain d'Élémentaire de cailloux"],
                        () => {
                            this.useEffect("creature");
                            this.closeInterface();
                        }),
                    new Button(["Inflige 5 dégâts spéciaux à toutes les unités sur le terrain adverse"],
                        () => {
                            this.useEffect("damage");
                            this.closeInterface();
                        })]);
        }
    };

    autoUse = () => {
        if (this.owner().ressource("Mana").total() >= 30) {
            this.useEffect();
        }
        else {
            this.useEffect("creature");
        }
    };

    useEffect = (choice: string | undefined = undefined) => {
        if (this.owner().ressource("Mana").total() >= 30) {
            this.owner().ressource("Mana").spend(30);

            let nb_creature: number = this.owner().zone("Terrain").size - this.owner().zone("Terrain").cards.length;
            for (let i = 0; i < nb_creature; i++) {
                this.owner().getCard("Élémentaire de cailloux").add("Terrain");
            }

            let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(5, this);
            }
        }
        else {
            if (choice == "creature") {
                let nb_creature: number = this.owner().zone("Terrain").size - this.owner().zone("Terrain").cards.length;
                for (let i = 0; i < nb_creature; i++) {
                    this.owner().getCard("Élémentaire de cailloux").add("Terrain");
                }
            }
            else if (choice == "damage") {
                let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
                for (const card of adversary_battlefield) {
                    card.specialDamage(5, this);
                }
            }
        }

        this.move("Défausse");
        this.pose();
    };
};