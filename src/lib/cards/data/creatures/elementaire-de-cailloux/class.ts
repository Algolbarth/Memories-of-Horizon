import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class ElementaireDeCailloux extends Creature {
    name = "Élémentaire de cailloux";

    constructor(system: System) {
        super(system);

        this.init([["Terre", 5]]);

        this.initFamily(["Élémentaire"]);

        this.stat("Constitution").init(2);
        this.stat("Force").init(2);
        this.stat("Endurance").init(1);

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Inflige 5 dégâts spéciaux à une unité sur le terrain adverse.`, `Se détruit.`]]);
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull() || this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Se place sur votre terrain"],
                        () => {
                            this.useEffect("creature");
                            this.closeInterface();
                        }),
                    new Button(["Inflige 5 dégâts spéciaux à une unité sur le terrain adverse", "Se détruit"],
                        () => {
                            this.changePanel(1);
                        })])
                .addTarget(
                    [this.adversary().zone("Terrain")],
                    (target: Card) => {
                        return true;
                    },
                    (target: Creature) => {
                        this.useEffect("effect", target);
                        this.closeInterface();
                    });
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature");
        }
    };

    autoUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            this.useEffect("effect", this.adversary().zone("Terrain").cards[0]);
        }
        else if (this.owner().zone("Terrain").isNotFull()) {
            this.useEffect("creature");
        }
    };

    useEffect = (choice: string, target: Unit | undefined = undefined) => {
        if (choice == "creature") {
            this.move("Terrain");
        }
        else if (choice == "effect" && target != undefined) {
            this.targeting(target);

            target.specialDamage(5, this);
            this.destroy();
        }

        this.pose();
    };
};