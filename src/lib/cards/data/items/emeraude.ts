import type { System } from '$lib/system/class';
import { Item } from '$lib/cards/class/item';
import { Equipment } from '$lib/cards/class/equipment';
import { Button, UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Emeraude extends Item {
    name = "Émeraude";

    constructor(system: System) {
        super(system);

        this.init([["Nature", 15]]);

        this.initFamily(["Joyau"]);

        this.addChoice([
            "Augmente de 1 votre production de nature.",
            "Augmente de 20 la constitution d'un objet de famille Equipement dans votre inventaire."]);
    };

    userInterface = () => {
        let check = false;
        for (const card of this.owner().zone("Inventaire").cards) {
            if (card instanceof Equipment) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Augmente de 1 votre production de nature"],
                        () => {
                            this.useEffect("production");
                            this.closeInterface();
                        }),
                    new Button(["Augmente de 20 la constitution d'un objet de famille Equipement dans votre inventaire"],
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
        }
        else {
            this.useEffect("production");
            this.closeInterface();
        }
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
            this.owner().ressource("Nature").increase(1);
        }
        else if (choice == "equipment" && target != undefined) {
            this.targeting(target);

            target.equipStat("Constitution").increase(20);
        };


        this.move("Défausse");
        this.pose();
    };
};