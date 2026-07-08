import type { System } from '$lib/system/class';
import { Action } from '$lib/cards/class/action';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class Option extends Action {
    name = "Option";

    constructor(system: System) {
        super(system);

        this.init([["Or", 8]]);

        this.addChoice([
            `Pioche 3 cartes.`,
            `Découvre 1 carte.`]);
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Pioche 3 cartes"],
                    () => {
                        this.useEffect("draw");
                        this.closeInterface();
                    }),
                new Button(["Découvre 1 carte"],
                    () => {
                        this.useEffect("discover");
                        this.closeInterface();
                    })]);
    };

    autoUse = () => {
        this.useEffect("draw");
    };

    useEffect = (choice: string) => {
        if (choice == "draw") {
            this.owner().draw(3);
        }
        else if (choice == "discover") {
            this.owner().discover(1);
        }

        this.move("Défausse");
        this.pose();
    };
};