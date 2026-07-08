import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Eboulement extends Action {
    name = "Éboulement";

    constructor(system: System) {
        super(system);

        this.init([["Or", 12], ["Terre", 12]]);

        this.addText([
            `Quand posé : Augmente jusqu'à 1 l'étourdissement d'une unité sur le terrain adverse.`,
            `Si cette unité est étourdie : Lui inflige 50 dégâts spéciaux à la place.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        this.useEffect(this.adversary().zone("Terrain").cards[0]);
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        if (target.stat("Étourdissement").value() >= 1) {
            target.specialDamage(50, this);
        }
        else {
            target.stat("Étourdissement").fix(1);
        }

        this.move("Défausse");
        this.pose();
    };
};