import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Item } from '$lib/cards/class/item';
import type { Concoction } from '../../items';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class Melange extends Action {
    name = "Mélange";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Fusionne 2 objets de famille Potion dans votre inventaire en {card:Concoction}.`);
    };

    canUse = () => {
        let nb_potion: number = 0;
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card instanceof Item && card.isFamily("Potion")) {
                nb_potion++;
                if (nb_potion > 1) {
                    return true;
                }
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Inventaire")],
                (target: Card) => {
                    return target instanceof Item && target.isFamily("Potion");
                },
                (target: Item) => {
                    this.saveChoice(target);
                    this.changePanel(1);
                })
            .addTarget(
                [this.owner().zone("Inventaire")],
                (target: Card) => {
                    return target instanceof Item && target.isFamily("Potion") && target != this.currentInterface().first_choice;
                },
                (target: Item) => {
                    this.useEffect(this.currentInterface().first_choice, target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let potion_1 = undefined;
        let potion_2 = undefined;

        for (const card of this.owner().zone("Inventaire").cards) {
            if (potion_1 == undefined && card instanceof Item && card.isFamily("Potion")) {
                potion_1 = card;
            }
            if (card != potion_1 && potion_2 == undefined && card instanceof Item && card.isFamily("Potion")) {
                potion_2 = card;
            }
        }

        if (potion_1 != undefined && potion_2 != undefined) {
            this.useEffect(potion_1, potion_2);
        }
    };

    useEffect = (potion_1: Item, potion_2: Item) => {
        potion_1.remove();
        potion_2.remove();

        let concoction: Concoction = this.owner().getCard("Concoction");
        concoction.infuse(potion_1);
        concoction.infuse(potion_2);

        concoction.add("Inventaire");

        this.move("Défausse");
        this.pose();
    };
};