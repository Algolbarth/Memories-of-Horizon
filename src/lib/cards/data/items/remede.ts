import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import type { Stat } from '$lib/cards/class/stat';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Remede extends Item {
    name = "Remède";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addText(`Quand posé : Retire un effet négatif d'une créature sur votre terrain.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.hasDebuff()) {
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
                    return target instanceof Creature && target.hasDebuff();
                },
                (target: Creature) => {
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
                    this.game().user_interface.selected_panel = this.game().user_interface.panels.length - 1;
                });
    };

    autoUse = () => {
        let target = undefined;
        let debuff = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.hasDebuff()) {
                for (const stat of card.stats) {
                    if (stat.debuff && stat.condition()) {
                        target = card;
                        debuff = stat;
                    }
                }
            }
        }

        if (target != undefined && debuff != undefined) {
            this.useEffect(target, debuff);
        }
    };

    useEffect = (target: Creature, stat: Stat) => {
        this.targeting(target);

        stat.set(stat.min);

        this.move("Défausse");
        this.pose();
    };
};