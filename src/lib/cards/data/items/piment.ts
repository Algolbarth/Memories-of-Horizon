import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Piment extends Item {
    name = "Piment";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Feu", 8]]);

        this.initFamily(["Nourriture", "Plante"]);

        this.addText([
            "Quand posé : Soigne 30 blessures à une créature sur le terrain.",
            "[satiety {Augmente de 10 la brûlure de cette créature à la place.}]"]);
    };

    canUse = () => {
        if (this.owner().is_player) {
            for (const entity of [this.owner(), this.adversary()]) {
                for (const card of entity.zone("Terrain").cards) {
                    if (card instanceof Creature) {
                        return true;
                    }
                }
            }
        }
        else {
            for (const card of this.owner().zone("Terrain").cards) {
                if (card instanceof Creature && card.isDamaged()) {
                    return true;
                }
            }
            for (const card of this.adversary().zone("Terrain").cards) {
                if (card instanceof Creature) {
                    return true;
                }
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature && card.isFullLife()) {
                    return true;
                }
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain"), this.adversary().zone("Terrain")],
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
            if (target == undefined && card instanceof Creature && card.isDamaged()) {
                target = card;
            }
        }
        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.isFullLife()) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature) => {
        this.targeting(target);

        if (!target.isDamaged()) {
            target.stat("Brûlure").increase(10);
        }
        else {
            target.heal(30);
        }

        this.move("Défausse");
        this.pose();
    };
};