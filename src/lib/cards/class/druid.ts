import type { System } from "$lib/system/class";
import { Button, UserInterface } from "../user-interface/class";
import { Creature } from "./creature";

export class Druid extends Creature {
    alternative_form: string = "";

    constructor(system: System) {
        super(system);

        this.initFamily(["Druide"]);

        this.addTrait("Forme animale", false);

        this.addTrait("Forme druidique", false);
        this.trait("Forme druidique").value = function () {
            return !this.card.trait("Forme animale").value();
        };

        this.addChoice([
            `Se place sur votre terrain.`,
            [`Se transforme en {card:{card.alternative_form}}.`, `Se place sur votre terrain.`]]);
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addChoice([
                new Button(["Se place sur votre terrain"],
                    () => {
                        this.useEffect("place");
                        this.closeInterface();
                    }),
                new Button(["Se transforme en " + this.alternative_form, "Se place sur votre terrain"],
                    () => {
                        this.useEffect("transform");
                        this.closeInterface();
                    })]);
    };

    autoUse = () => {
        this.useEffect("place");
    };

    useEffect = (choice: string) => {
        if (choice == "transform") {
            let transformation = this.transform(this.alternative_form);

            transformation.move("Terrain");
            transformation.pose();
        }
        else if (choice == "place") {
            this.move("Terrain");
            this.pose();
        }
    };
};