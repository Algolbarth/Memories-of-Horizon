import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Biscuit extends Item {
    name = "Biscuit";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            "Quand posé : Soigne 20 blessures à une créature sur votre terrain.",
            "[satiety {Génère {card:Bonhomme biscuit} sur votre terrain à la place.}]"]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isDamaged() || this.owner().zone("Terrain").isNotFull())) {
                return true;
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFullLife() && this.owner().zone("Terrain").isNotFull()) {
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
            this.owner().getCard("Bonhomme biscuit").add("Terrain");
        }
        else {
            target.heal(20);
        }

        this.move("Défausse");
        this.pose();
    };
};