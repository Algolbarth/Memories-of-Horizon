import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class CycleDeLEau extends Action {
    name = "Cycle de l'eau";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40], ["Eau", 35]]);

        this.addChoice([
            `Augmente de 1 la taille de votre pile.`,
            `Augmente de 1 la taille de votre inventaire.`,
            `Augmente de 1 la taille de votre terrain.`],
            undefined,
            "[source {100, Augmente de 1 la taille de votre pile, de votre inventaire et de votre terrain à la place.}]");
    };

    userInterface = () => {
        if (this.owner().ressource("Eau").total() >= 100) {
            this.useEffect();
        }
        else {
            let types = ["pile", "inventaire", "terrain"];
            let choices = [];
            for (const type of types) {
                choices.push(new Button(["Augmente de 1 la taille de votre " + type],
                    () => {
                        this.useEffect(type.charAt(0).toUpperCase() + type.slice(1));
                        this.closeInterface();
                    }));
            }

            this.game().user_interface = new UserInterface(this).addChoice(choices);
        }
    };

    autoUse = () => {
        if (this.owner().ressource("Eau").total() >= 100) {
            this.useEffect();
        } else {
            this.useEffect("Terrain");
        }
    };

    useEffect = (choice: string | undefined = undefined) => {
        if (this.owner().ressource("Eau").total() >= 100) {
            this.owner().ressource("Eau").spend(100);

            this.owner().zone("Pile").size += 1;
            this.owner().zone("Inventaire").size += 1;
            this.owner().zone("Terrain").size += 1;
        }
        else {
            this.owner().zone(choice).size += 1;
        }

        this.move("Défausse");
        this.pose();
    };
};