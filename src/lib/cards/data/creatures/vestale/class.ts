import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Vestale extends Creature {
    name = "Vestale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8], ["Feu", 8]]);

        this.initFamily(["Gobelin"]);

        this.stat("Constitution").init(3);
        this.stat("Force").init(10);

        this.addChoice([
            `Augmente de 20 la force d'une créature sur votre terrain.`,
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
                    new Button(["Augmente de 20 la force d'une créature sur votre terrain"],
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
                        this.useEffect("strength", target);
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
            this.useEffect("strength", target);
        }
    };

    useEffect = (choice: string | undefined = undefined, target: Creature | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            if (choice == "strength") {
                target.stat("Force").increase(20);
            }
            else if (choice == "heal") {
                target.heal(20);
            }
        }

        this.move("Terrain");
        this.pose();
    };
};