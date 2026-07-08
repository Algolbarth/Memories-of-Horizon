import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Building } from '$lib/cards/class/building';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Braquage extends Action {
    name = "Braquage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.addText([
            `Quand posé : Produit autant de ressources que la vente d'un bâtiment sur votre terrain.`,
            `Fixe à 0 la vente de ce bâtiment.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Building;
                },
                (target: Building) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Building) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Building) => {
        this.targeting(target);

        for (const sale of target.sale) {
            this.owner().ressource(sale.name).produce(sale.value());

            sale.turn = 0;
            sale.add = -sale.base;
        }

        this.move("Défausse");
        this.pose();
    };
};