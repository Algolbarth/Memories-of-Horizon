import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { Equipment } from '$lib/cards/class/equipment';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Rubis extends Item {
    name = "Rubis";

    constructor(system: System) {
        super(system);

        this.init([["Feu", 15]]);

        this.initFamily(["Joyau"]);

        this.addChoice([
            "Augmente de 1 votre production de feu.",
            "Augmente de 30 la force d'un objet de famille Equipement dans votre inventaire."]);
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Augmente de 1 votre production de feu"],
                    () => {
                        this.saveChoice("production");
                        this.changePanel(1);
                    }),
                new Button(["Augmente de 30 la force d'un objet de famille Equipement dans votre inventaire"],
                    () => {
                        this.changePanel(1);
                    })])
            .addTarget(
                [this.owner().zone("Inventaire")],
                (target: Card) => {
                    return target instanceof Equipment;
                },
                (target: Equipment) => {
                    this.useEffect("equipment", target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Inventaire").cards) {
            if (target == undefined && card instanceof Equipment) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect("equipment", target);
        }
        else {
            this.useEffect("production");
        }
    };

    useEffect = (choice: string, target: Equipment | undefined = undefined) => {
        if (choice == "production") {
            this.owner().ressource("Feu").increase(1);
        }
        else if (choice == "equipment" && target != undefined) {
            this.targeting(target);

            target.equipStat("Force").increase(50);
        };


        this.move("Défausse");
        this.pose();
    };
};