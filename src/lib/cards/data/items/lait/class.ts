import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import { Stat } from '$lib/cards/class/stat';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Lait extends Item {
    name = "Lait";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.initFamily(["Nourriture"]);

        this.addText([
            "Quand posé : Soigne 20 blessures à une créature sur votre terrain.",
            "[satiety {Retire un effet négatif à cette créature à la place.}]"]);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isDamaged() || card.hasDebuff())) {
                return true;
            }
        }
        return false;
    };

    canSatiety = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && (card.isFullLife() && card.hasDebuff())) {
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
                    return target instanceof Creature && (target.isDamaged() || target.hasDebuff());
                },
                (target: Creature) => {
                    if (target.isFullLife()) {
                        let choices: Button[] = [];
                        for (const stat of target.stats) {
                            if (stat.debuff && stat.condition()) {
                                choices.push(new Button(
                                    ["Retire " + stat.name],
                                    () => {
                                        this.useEffect(target, stat);
                                        this.closeInterface();
                                    }));
                            }
                        }

                        this.game().user_interface.addChoice(choices);
                        this.changePanel(this.game().user_interface.panels.length - 1);
                    }
                    else {
                        this.useEffect(target);
                        this.closeInterface();
                    }
                });
    };

    autoUse = () => {
        let target = undefined;
        let debuff = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                if (card.isDamaged()) {
                    target = card;
                }
                else if (card.hasDebuff()) {
                    for (const stat of card.stats) {
                        if (stat.debuff && stat.condition()) {
                            target = card;
                            debuff = stat;
                        }
                    }
                }
            }
        }

        if (target != undefined && debuff != undefined) {
            this.useEffect(target, debuff);
        }
        else if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Creature, stat: Stat | undefined = undefined) => {
        this.targeting(target);

        if (target.isFullLife() && stat != undefined) {
            stat.set(stat.min);
        }
        else {
            target.heal(20);
        }

        this.move("Défausse");
        this.pose();
    };
};