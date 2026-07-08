import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import type { Unit } from '$lib/cards/class/unit';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class EventailDeCouteaux extends Equipment {
    name = "Éventail de couteaux";

    constructor(system: System) {
        super(system);

        this.init([["Or", 20]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(30);

        this.addChoice([
            `S'équipe à une créature sur votre terrain.`,
            `Inflige 3 dégâts spéciaux à toutes les unités sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.canEquip()) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["S'équipe à une créature sur votre terrain"],
                    () => {
                        this.changePanel(1);
                    }),
                new Button(["Inflige 3 dégâts spéciaux à toutes les unités sur le terrain adverse"],
                    () => {
                        this.useEffect("damage");
                        this.closeInterface();
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature && target.canEquip();
                },
                (target: Creature) => {
                    this.useEffect("equip", target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.canEquip()) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect("equip", target);
            return 0;
        }
        else if (this.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect("damage");
        }
    };

    useEffect = (choice: string, target: Creature | undefined = undefined) => {
        if (choice == "equip" && target != undefined) {
            this.targeting(target);
            target.equip(this);
        }
        else if (choice == "damage") {
            let adversary_battlefield: Unit[] = copy(this.adversary().zone("Terrain").cards);
            for (const card of adversary_battlefield) {
                card.specialDamage(3, this);
            }
            this.move("Défausse");
        }

        this.pose();
    };
};