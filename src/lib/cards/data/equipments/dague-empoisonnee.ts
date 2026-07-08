import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class DagueEmpoisonnee extends Equipment {
    name = "Dague empoisonnée";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.initFamily(["Arme"]);

        this.addChoice([
            `S'équipe à une créature sur votre terrain.`,
            `Augmente de 5 le poison d'une créature sur le terrain adverse.`]);
        this.addText(`Quand le porteur attaque une créature empoisonnée : Augmente de 1 la toxicité de la créature attaquée.`);
    };

    canUse = () => {
        for (const card of this.owner().adversary().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
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
                new Button(["Augmente de 5 le poison d'une créature sur le terrain adverse"],
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
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect("poison", target);
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

        for (const card of this.owner().adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                this.useEffect("poison", card);
            }
        }

        if (target != undefined) {
            this.useEffect("poison", target);
        }
    };

    useEffect = (choice: string, target: Creature) => {
        this.targeting(target);

        if (choice == "equip") {
            target.equip(this);
        }
        else if (choice == "poison") {
            target.stat("Poison").increase(5);
            this.move("Défausse");
        }

        this.pose();
    };

    attackEffect = (defender: Unit) => {
        if (defender instanceof Creature && defender.stat("Poison").value() > 0) {
            defender.stat("Toxicité").increase(1);
        }
    };
};