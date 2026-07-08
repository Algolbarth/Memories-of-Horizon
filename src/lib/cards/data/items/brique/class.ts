import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Building } from '$lib/cards/class/building';
import { Item } from '$lib/cards/class/item';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Brique extends Item {
    name = "Brique";

    constructor(system: System) {
        super(system);

        this.init([["Or", 6], ["Terre", 6]]);

        this.addChoice([
            `Soigne 20 blessures à un bâtiment sur votre terrain.`,
            `Inflige 20 dégâts spéciaux à une unité sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Building && card.isDamaged()) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Soigne 20 blessures à un bâtiment sur votre terrain"],
                    () => {
                        this.changePanel(1);
                    }),
                new Button(["Inflige 20 dégâts spéciaux à une unité sur le terrain adverse"],
                    () => {
                        this.changePanel(2);
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Building && target.isDamaged();
                },
                (target: Building) => {
                    this.useEffect("heal", target);
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
        if (this.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect("damage", this.adversary().zone("Terrain").cards[0]);
        }
        else {
            let target = undefined;
            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Building && card.isDamaged()) {
                    target = card;
                }
            }
            if (target != undefined) {
                this.useEffect("heal", target);
            }
        }
    };

    useEffect = (choice: string, target: Unit) => {
        this.targeting(target);

        if (choice == "heal") {
            target.heal(20);
        }
        else if (choice == "damage") {
            target.specialDamage(20, this);
        }

        this.move("Défausse");
        this.pose();
    };
};