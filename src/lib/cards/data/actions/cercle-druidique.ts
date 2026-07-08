import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';
import type { Card } from '$lib/cards/class/card';
import { UserInterface } from '$lib/cards/user-interface/class';

export class CercleDruidique extends Action {
    name = "Cercle druidique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 80]]);

        this.initFamily(["Druide"]);

        this.addText([
            `Quand posé : Produit 5 fois plus de ressources que de créatures sur votre terrain possédant au moins les éléments d'une créature de famille Druide sur votre terrain.`,
            `Produit 5 or pour chaque créature de famille Druide sur votre terrain.`]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFamily("Druide")) {
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
                    return target instanceof Creature && target.isFamily("Druide");
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.isFamily("Druide")) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        let nb_druid: number = 0;
        let nb_same_element: number = 0;

        for (const card of battlefield) {
            let check = true;
            for (const e of target.elements.total()) {
                if (!card.isElement(e)) {
                    check = false;
                }
            }

            if (card.isFamily("Druide")) {
                nb_druid++;
            }
            if (check) {
                nb_same_element++;
            }
        }

        for (const e of target.elements.total()) {
            if (e != "Neutre") {
                this.owner().ressource(e).produce(5 * nb_same_element);
            }
            else {
                this.owner().ressource("Or").produce(5 * nb_same_element);
            }
        }
        this.owner().ressource("Or").produce(5 * nb_druid);

        this.move("Défausse");
        this.pose();
    };
};