import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class PotionParfumee extends Item {
    name = "Potion parfumée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat(601, "Infusion", 5);

        this.addText(`Quand posé : Augmente de 1 le charisme d'une créature sur le terrain pendant ce tour pour toutes les 5 valeur d'infusion.`);
        this.addText(`[details {Augmente de {Math.floor(card.stat("Infusion").value() / 5)} le charisme d'une créature sur le terrain pendant ce tour.}]`);
    };

    canUse = () => {
        if (this.stat("Infusion").value() < 5) {
            return false;
        }
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature) {
                    return true;
                }
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.stat("Charisme").turn += Math.floor(this.stat("Infusion").value() / 5);

        this.move("Défausse");
        this.pose();
    };
};