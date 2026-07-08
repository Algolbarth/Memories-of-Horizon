import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Apothicaire extends Creature {
    name = "Apothicaire";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addChoice([
            `Augmente de 10 la régénération d'une créature sur votre terrain.`,
            `Augmente de 10 la toxicité d'une créature empoisonnée sur le terrain adverse.`]);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;
            }
        }
        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Creature && card.stat("Poison").value() > 0) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Augmente de 10 la régénération d'une créature sur votre terrain"],
                        () => {
                            this.changePanel(1);
                        }),
                    new Button(["Augmente de 10 la toxicité d'une créature empoisonnée sur le terrain adverse"],
                        () => {
                            this.changePanel(2);
                        })])
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature;
                    },
                    (target: Creature) => {
                        this.useEffect("regeneration", target);
                        this.closeInterface();
                    })
                .addTarget(
                    [this.adversary().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature && target.stat("Poison").value() > 0;
                    },
                    (target: Creature) => {
                        this.useEffect("toxicity", target);
                        this.closeInterface();
                    });
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        for (const card of this.adversary().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.stat("Poison").value() > 0) {
                target = card;
            }
        }

        if (target == undefined) {
            this.useEffect();
        }
        else if (target.isAlly(this)) {
            this.useEffect("regeneration", target);
        }
        else {
            this.useEffect("toxicity", target);
        }
    };

    useEffect = (choice: string | undefined = undefined, target: Creature | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            if (choice == "regeneration") {
                target.stat("Régénération").increase(10);
            }
            else if (choice == "toxicity") {
                target.stat("Toxicité").increase(10);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};