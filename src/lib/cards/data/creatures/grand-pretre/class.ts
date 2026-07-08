import { copy } from '$lib/utils';
import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class GrandPretre extends Creature {
    name = "Grand prêtre";

    constructor(system: System) {
        super(system);

        this.init([["Or", 125]]);

        this.initFamily(["Humain", "Commandant"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addChoice([
            `Augmente de 15 la constitution de toutes les créatures sur votre terrain.`,
            `Soigne 20 blessures à toutes les créatures sur votre terrain.`]);
    };

    userInterface = () => {
        let check_heal = false;
        let check_creature = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                if (card.isDamaged()) {
                    check_heal = true;
                }
                else {
                    check_creature = true;
                }
            }
        }

        if (check_heal) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Augmente de 15 la constitution de toutes les créatures sur votre terrain"],
                        () => {
                            this.useEffect("life");
                            this.closeInterface();
                        }),
                    new Button(["Soigne 20 blessures à toutes les créatures sur votre terrain"],
                        () => {
                            this.useEffect("heal");
                            this.closeInterface();
                        })]);
        }
        else if (check_creature) {
            this.useEffect("life");
        }
        else {
            this.useEffect();
        }
    };

    autoUse = () => {
        let check_heal = false;
        let check_creature = false;

        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature) {
                if (card.isDamaged()) {
                    check_heal = true;
                }
                else {
                    check_creature = true;
                }
            }
        }

        if (check_heal) {
            this.useEffect("heal");
        }
        else if (check_creature) {
            this.useEffect("life");
        }
        else {
            this.useEffect();
        }
    };

    useEffect = (choice: string | undefined = undefined) => {
        let battlefield: Unit[] = copy(this.owner().zone("Terrain").cards);
        for (const card of battlefield) {
            if (card instanceof Creature) {
                if (choice == "life") {
                    card.stat("Constitution").increase(15);
                }
                else if (choice == "heal") {
                    card.heal(20);
                }
            }
        }

        this.move("Terrain");
        this.pose();
    };
};