import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class PotionDeSoin extends Item {
    name = "Potion de soin";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Potion"]);

        this.addStat(601, "Infusion", 5);

        this.addText(`Quand posé : Soigne 2 blessures à une créature sur votre terrain pour chaque valeur d'infusion.`);
        this.addText(`[details {Soigne {card.stat("Infusion").value() * 2} blessures à une créature sur votre terrain.}]`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isDamaged()) {
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
                    return target instanceof Creature && target.isDamaged();
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.isDamaged()) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        target.heal(this.stat("Infusion").value() * 2);

        this.move("Défausse");
        this.pose();
    };
};