import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Creature } from '$lib/cards/class/creature';
import { Unit } from '$lib/cards/class/unit';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Griffure extends Action {
    name = "Griffure";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText([
            `Quand posé : Augmente de 10 la force d'une créature sur votre terrain.`,
            `Inflige 10 dégâts spéciaux à une unité sur le terrain adverse.`]);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length == 0) {
            return false;
        }
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
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
                    return target instanceof Creature;
                },
                (target: Creature) => {
                    this.saveChoice(target);
                    this.changePanel(1);
                })
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(this.currentInterface().first_choice, target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let ally = undefined;
        let opponent = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (ally == undefined && card instanceof Creature) {
                ally = card;
            }
        }

        for (const card of this.adversary().zone("Terrain").cards) {
            if (opponent == undefined && card instanceof Unit) {
                opponent = card;
            }
        }

        if (ally != undefined && opponent != undefined) {
            this.useEffect(ally, opponent);
        }
    };

    useEffect = (ally: Creature, opponent: Unit) => {
        this.targeting(ally);

        ally.stat("Force").increase(10);

        this.targeting(opponent);

        opponent.specialDamage(10, this);

        this.move("Défausse");
        this.pose();
    };
};