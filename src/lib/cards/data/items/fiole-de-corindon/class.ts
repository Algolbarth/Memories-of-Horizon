import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class FioleDeCorindon extends Item {
    name = "Fiole de corindon";

    constructor(system: System) {
        super(system);

        this.init([["Or", 100]]);

        this.addText(`Quand posé : Augmente de 100 l'infusion d'un objet de famille Potion (sauf {card:Concoction} dans votre inventaire.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card instanceof Item && card.isFamily("Potion") && card.name != "Concoction") {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Inventaire")],
                (target: Card) => {
                    return target instanceof Item && target.isFamily("Potion") && target.name != "Concoction";
                },
                (target: Item) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Inventaire").cards) {
            if (target == undefined && card instanceof Item && card.isFamily("Potion") && card.name != "Concoction") {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Item) => {
        this.targeting(target);

        target.stat("Infusion").increase(100);

        this.move("Défausse");
        this.pose();
    };
};