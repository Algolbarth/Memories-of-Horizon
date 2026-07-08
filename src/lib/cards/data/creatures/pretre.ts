import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Pretre extends Creature {
    name = "Prêtre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addChoice([
            `Augmente de 15 la constitution d'une créature sur votre terrain.`,
            `Soigne 20 blessures d'une créature sur votre terrain.`]);
    };

    userInterface = () => {
        let check = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Augmente de 15 la constitution d'une créature sur votre terrain"],
                        () => {
                            this.changePanel(1);
                        }),
                    new Button(["Soigne 20 blessures d'une créature sur votre terrain"],
                        () => {
                            this.changePanel(2);
                        })])
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature;
                    },
                    (target: Creature) => {
                        this.useEffect("life", target);
                        this.closeInterface();
                    })
                .addTarget(
                    [this.owner().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature && target.isDamaged();
                    },
                    (target: Creature) => {
                        this.useEffect("heal", target);
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

        if (target == undefined) {
            this.useEffect();
        }
        else if (target.isDamaged()) {
            this.useEffect("heal", target);
        }
        else {
            this.useEffect("life", target);
        }
    };

    useEffect = (choice: string | undefined = undefined, target: Creature | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            if (choice == "life") {
                target.stat("Constitution").increase(15);
            }
            else if (choice == "heal") {
                target.heal(20);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};