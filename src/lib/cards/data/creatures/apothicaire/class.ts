import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import Use from './use.svelte';

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

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            for (const card of this.owner().zone("Terrain").cards) {
                if (check == false && card instanceof Creature) {
                    check = true;
                }
            }
            for (const card of this.adversary().zone("Terrain").cards) {
                if (check == false && card instanceof Creature && card.stat("Poison").value() > 0) {
                    check = true;
                }
            }

            if (check) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect(undefined, undefined);
            }
        }
        else {
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
                this.useEffect(target, undefined);
            }
            else if (target.isAlly(this)) {
                this.useEffect(target, "regeneration");
            }
            else {
                this.useEffect(target, "toxicity");
            }


        }
    };

    useEffect = (target: Creature | undefined, choice: string | undefined) => {
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