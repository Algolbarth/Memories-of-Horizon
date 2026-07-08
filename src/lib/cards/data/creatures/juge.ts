import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';
import { Unit } from '$lib/cards/class/unit';

export class Juge extends Creature {
    name = "Juge";

    constructor(system: System) {
        super(system);

        this.init([["Or", 105]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText([
            `Quand posé : Fixe le charisme d'une créature sur le terrain au plus haut charisme parmi les unités sur le terrain.`,
            `Augmente de 1 le charisme de cette créature.`]);
    };

    userInterface = () => {
        let check_charisma = false;
        let check = false;

        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature) {
                    check = true;
                }
                else if (check_charisma == false && card instanceof Unit && card.stat("Charisme").value() > 0) {
                    check_charisma = true;
                }
            }
        }

        if (check && check_charisma) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Terrain"), this.adversary().zone("Terrain")],
                    (target: Card) => {
                        return true;
                    },
                    (target: Creature) => {
                        this.useEffect(target);
                        this.closeInterface();
                    });
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        let target = undefined;
        let check_charisma = false;

        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (check_charisma == false && card instanceof Unit && card.stat("Charisme").value() > 0) {
                    check_charisma = true;
                }
            }
        }

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature) {
                target = card;
            }
        }

        if (check_charisma && target != undefined) {
            this.useEffect(target);
        }
        else {
            this.useEffect();
        }
    };

    useEffect = (target: Creature | undefined = undefined) => {
        if (target != undefined) {
            this.targeting(target);

            let max_charisma: number = 0;
            for (const entity of [this.owner(), this.adversary()]) {
                for (const card of entity.zone("Terrain").cards) {
                    if (card.stat("Charisme").value() > max_charisma) {
                        max_charisma = card.stat("Charisme").value();
                    }
                }
            }

            target.stat("Charisme").set(max_charisma + 1);
        }

        this.move("Terrain");
        this.pose();
    };
};