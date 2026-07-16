import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Enchanteresse extends Creature {
    name = "Enchanteresse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 65]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addChoice([
            `Annule la transformation d'une de vos cartes transformées.`,
            `Transforme en {card:Mouton} une créature sur le terrain adverse.`]);
    };

    userInterface = () => {
        let check = false;

        for (const zone of this.owner().zones) {
            for (const card of zone.cards) {
                if (card.original_form != undefined && card.original_form != card.alternative_form) {
                    check = true;
                }
            }

        }
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Annule la transformation d'une de vos cartes transformées"],
                        () => {
                            this.changePanel(1);
                        }),
                    new Button(["Transforme en Mouton une créature sur le terrain adverse"],
                        () => {
                            this.changePanel(2);
                        })])
                .addTarget(
                    [this.owner().zone("Pile"), this.owner().zone("Inventaire"), this.owner().zone("Terrain"), this.owner().zone("Défausse")],
                    (target: Card) => {
                        return target.original_form != undefined && target.original_form != target.alternative_form;
                    },
                    (target: Card) => {
                        this.useEffect("clean", target);
                        this.closeInterface();
                    })
                .addTarget(
                    [this.adversary().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature;
                    },
                    (target: Creature) => {
                        this.useEffect("sheep", target);
                        this.closeInterface();
                    });
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        let target = undefined;

        for (const zone of this.owner().zones) {
            for (const card of zone.cards) {
                if (target == undefined && card.original_form != undefined && card.original_form != card.alternative_form) {
                    target = card;
                }
            }
        }

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (target == undefined) {
            this.useEffect();
        }
        else if (target.isAlly(this)) {
            this.useEffect("clean", target);
        }
        else {
            this.useEffect("sheep", target);
        }
    };

    useEffect = (choice: string | undefined = undefined, target: Card | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            if (choice == "clean" && target.original_form != undefined) {
                console.log(target.original_form);
                target = target.transform(target.original_form);
            }
            else if (choice == "sheep") {
                target.transform("Mouton");
            }
        }

        this.move("Terrain");
        this.pose();
    };
};