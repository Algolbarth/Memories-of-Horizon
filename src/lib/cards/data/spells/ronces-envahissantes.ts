import type { System } from '$lib/system/class';
import { Spell } from '$lib/cards/class/spell';
import { Unit } from '$lib/cards/class/unit';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class RoncesEnvahissantes extends Spell {
    name = "Ronces envahissantes";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Nature", 15]]);

        this.addChoice([
            [`Augmente de 10 l'épine d'une unité sur votre terrain.`,
                `[sorcery {25, Augmente de 20 l'épine à la place.}]`],
            [`Inflige 50 dégâts à une unité sur le terrain adverse.`,
                `[sorcery {25, Inflige 100 dégâts à la place.}]`]]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").cards.length > 0) {
            return true;
        }
        if (this.owner().is_player) {
            if (this.adversary().zone("Terrain").cards.length > 0) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Augmente de 10 l'épine d'une unité sur votre terrain"],
                    () => {
                        this.changePanel(1);
                    }),
                new Button(["Inflige 50 dégâts à une unité sur le terrain adverse"],
                    () => {
                        this.changePanel(2);
                    })])
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Unit;
                },
                (target: Unit) => {
                    this.useEffect("thorn", target);
                    this.closeInterface();
                })
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Unit;
                },
                (target: Unit) => {
                    this.useEffect("damage", target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Unit) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect("thorn", target);
        }
    };

    useEffect = (choice: string, target: Unit) => {
        this.targeting(target);

        if (this.owner().ressource("Mana").total() >= 25) {
            this.owner().ressource("Mana").spend(25);

            if (choice == "thorn") {
                target.stat("Épine").increase(20);
            }
            else if (choice == "damage") {
                target.specialDamage(100, this);
            }
        }
        else {
            if (choice == "thorn") {
                target.stat("Épine").increase(10);
            }
            else if (choice == "damage") {
                target.specialDamage(50, this);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};