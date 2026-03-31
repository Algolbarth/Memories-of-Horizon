import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';

export class PluieDeCailloux extends Spell {
    name = "Pluie de cailloux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Terre", 15]]);

        this.addChoice([
            `Remplit votre terrain de {card:Élémentaire de caillou}.`,
            `Inflige 5 dégâts spéciaux à toutes les unités sur le terrain adverse.`],
            undefined,
            `[sorcery {30, les deux effets s'activent à la place.}]`
        );
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull() || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().ressource("Mana").total() >= 30) {
            this.useEffect(undefined);
        }
        else {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("damage");
            }
        }
    };

    useEffect = (choice: string | undefined) => {
        if (this.owner().ressource("Mana").total() >= 30) {
            this.owner().ressource("Mana").spend(30);

            let nb_creature = this.owner().zone("Terrain").size - this.owner().zone("Terrain").cards.length;
            for (let i = 0; i < nb_creature; i++) {
                this.owner().getCard("Élémentaire de caillou").add("Terrain");
            }

            let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(5, this);
            }
        }
        else {
            if (choice == "creature") {
                let nb_creature = this.owner().zone("Terrain").size - this.owner().zone("Terrain").cards.length;
                for (let i = 0; i < nb_creature; i++) {
                    this.owner().getCard("Élémentaire de caillou").add("Terrain");
                }
            }
            else if (choice == "damage") {
                let adversary_battlefield = copy(this.adversary().zone("Terrain").cards);
                for (const card of adversary_battlefield) {
                    card.specialDamage(5, this);
                }
            }
        }

        this.move("Défausse");
        this.pose();
    };
};