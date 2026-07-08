import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class AuraDeSpores extends Spell {
    name = "Aura de spores";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.addChoice([
            [`Augmente de 10 la radiation d'une créature sur votre terrain.`,
                `[sorcery {25, Augmente de 20 la radiation à la place.}]`],
            [`Augmente de 5 le poison d'une créature sur le terrain adverse.`,
                `Augmente de 10 la toxicité de cette créature.`,
                `[sorcery {25, Augmente de 30 la toxicité à la place.}]`]]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                return true;
            }
        }
        if (this.owner().is_player) {
            for (const card of this.adversary().zone("Terrain").cards) {
                if (card instanceof Creature) {
                    return true;
                }
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Augmente de 10 la radiation d'une créature sur votre terrain"],
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
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.useEffect("radiation", target);
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
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect("radiation", target);
        }
    };

    useEffect = (choice: string, target: Creature) => {
        this.targeting(target);

        if (this.owner().ressource("Mana").total() >= 25) {
            this.owner().ressource("Mana").spend(25);

            if (choice == "radiation") {
                target.stat("Radiation").increase(20);
            }
            else if (choice == "poison") {
                target.stat("Poison").increase(5);
                target.stat("Toxicité").increase(30);
            }
        }
        else {
            if (choice == "radiation") {
                target.stat("Radiation").increase(10);
            }
            else if (choice == "poison") {
                target.stat("Poison").increase(5);
                target.stat("Toxicité").increase(10);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};