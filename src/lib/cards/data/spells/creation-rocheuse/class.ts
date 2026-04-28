import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';
import Use from './use.svelte';

export class CreationRocheuse extends Spell {
    name = "Création rocheuse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30], ["Terre", 30]]);

        this.addChoice([
            `Génère {card:Élémentaire de roche} sur votre terrain.`,
            `Génère {card:Mur de roche} sur votre terrain.`],
            undefined,
            `[sorcery {50, Active les deux effets à la place.}]`
        );
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    select = () => {
        if (this.owner().ressource("Mana").total() >= 50) {
            this.useEffect();
        }
        else {
            if (this.owner().is_player) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect("creature");
            }
        }
    };

    useEffect = (choice: string | undefined = undefined) => {
        if (this.owner().ressource("Mana").total() >= 50) {
            this.owner().ressource("Mana").spend(50);

            this.owner().getCard("Élémentaire de roche").add("Terrain");
            this.owner().getCard("Mur de roche").add("Terrain");
        }
        else {
            if (choice == "creature") {
                this.owner().getCard("Élémentaire de roche").add("Terrain");
            }
            else if (choice == "building") {
                this.owner().getCard("Mur de roche").add("Terrain");
            }
        }

        this.move("Défausse");
        this.pose();
    };
};