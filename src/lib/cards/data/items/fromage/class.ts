import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Fromage extends Item {
    name = "Fromage";

    constructor(system: System) {
        super(system);

        this.init([["Or", 5]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            "Quand posé : Soigne 10 blessures à une créature sur le terrain.",
            "[satiety {Génère 2 {card:Souris} sur le terrain à la place.}]"]);
    };

    canUse = () => {
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature && (card.isDamaged() || (this.owner().is_player && entity.zone("Terrain").isNotFull()))) {
                    return true;
                }
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature && card.isFullLife() && entity.zone("Terrain").isNotFull()) {
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
                    return target instanceof Creature && (target.isDamaged() || target.owner().zone("Terrain").isNotFull());
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

        if (!target.isDamaged()) {
            target.owner().getCard("Souris").add("Terrain");
            target.owner().getCard("Souris").add("Terrain");
        }
        else {
            target.heal(10);
        }

        this.move("Défausse");
        this.pose();
    };
};