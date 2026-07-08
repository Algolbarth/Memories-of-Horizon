import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Unit } from '$lib/cards/class/unit';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class BucherDesVanites extends Action {
    name = "Bûcher des vanités";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.addText([
            `Quand posé : Meule toutes les cartes sur votre pile.`,
            `Inflige autant de dégâts spéciaux à une unité sur le terrain adverse que 10 fois le nombre de cartes meulées.`]);
    };

    canUse = () => {
        if (this.owner().zone("Pile").cards.length > 0 && this.adversary().zone("Terrain").cards.length > 0) {
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

        let value = 0;

        let stack: Card[] = copy(this.owner().zone("Pile").cards);
        for (const card of stack) {
            card.mill();
            value++;
        }

        target.specialDamage(10 * value, this);

        this.move("Défausse");
        this.pose();
    };
};