import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class DagueDeCuivre extends Equipment {
    name = "Dague de cuivre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(5);

        this.addChoice([
            `S'équipe à une créature sur votre terrain.`,
            `Inflige 5 dégâts spéciaux à une unité sur le terrain adverse.`]);
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
                new Button(["Inflige 5 dégâts spéciaux à une unité sur le terrain adverse"],
                    () => {
                        this.changePanel(2);
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature && target.canEquip();
                },
                (target: Creature) => {
                    this.useEffect("equip", target);
                    this.closeInterface();
                })
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect("damage", target);
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
        }
        else if (this.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (choice: string, target: Unit) => {
        this.targeting(target);

        if (choice == "equip" && target instanceof Creature) {
            target.equip(this);
        }
        else if (choice == "damage") {
            target.specialDamage(5, this);
            this.move("Défausse");
        }

        this.pose();
    };
};