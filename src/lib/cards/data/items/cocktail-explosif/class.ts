import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class CocktailExplosif extends Item {
    name = "Cocktail explosif";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25], ["Feu", 25]]);

        this.addText(`Quand posé : Augmente de 10 la brûlure d'une unité sur le terrain adverse et aux unités adjacentes.`);
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
        if (this.adversary().zone("Terrain").cards.length > 1) {
            this.useEffect(this.adversary().zone("Terrain").cards[1]);
        }
        else {
            this.useEffect(this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.stat("Brûlure").increase(10);
        if (target.slot != undefined && target.zone) {
            if (target.slot > 0) {
                target.zone.cards[target.slot - 1].stat("Brûlure").increase(10);
            }
            if (target.slot < target.zone.cards.length - 1) {
                target.zone.cards[target.slot + 1].stat("Brûlure").increase(10);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};