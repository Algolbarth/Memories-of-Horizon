import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Item } from '$lib/cards/class/item';
import { Creature } from '$lib/cards/class/creature';
import type { Card } from '$lib/cards/class/card';
import { Button, UserInterface } from '$lib/cards/user-interface/class';

export class CouteauDeChasse extends Item {
    name = "Couteau de chasse";

    constructor(system: System) {
        super(system);

        this.init([["Or", 10]]);

        this.addChoice([
            `Détruit une créature de famille Bête sur votre terrain.`,
            `Produit 1 or pour chaque créature de famille Bête dans votre défausse.`]);
    };

    canUse = () => {
        for (const zone of ["Terrain", "Défausse"]) {
            for (const card of this.owner().zone(zone).cards) {
                if (card instanceof Creature && card.isFamily("Bête") && (card.canBeDestroyed() || zone == "Défausse")) {
                    return true;
                }
            }
        }
        return false;
    };

    userInterface = () => {
        let check: boolean = false;
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFamily("Bête") && card.canBeDestroyed()) {
                check = true;
            }
        }

        if (check) {
            this.game().user_interface = new UserInterface(this)
                .addChoice([
                    new Button(["Détruit une créature de famille Bête sur votre terrain"],
                        () => {
                            this.changePanel(1);
                        }),
                    new Button(["Produit 1 or pour chaque créature de famille Bête dans votre défausse"],
                        () => {
                            this.useEffect("production");
                            this.closeInterface();
                        })])
                .addTarget(
                    [this.adversary().zone("Terrain")],
                    (target: Card) => {
                        return target instanceof Creature && target.isFamily("Bête") && target.canBeDestroyed();
                    },
                    (target: Unit) => {
                        this.useEffect("damage", target);
                        this.closeInterface();
                    });
        }
        else {
            this.useEffect("production");
        }
    };

    autoUse = () => {
        this.useEffect("production");
    };

    useEffect = (choice: string, target: Unit | undefined = undefined) => {
        if (choice == "production") {
            let nb_beast: number = 0;
            for (const card of this.owner().zone("Défausse").cards) {
                if (card instanceof Creature && card.isFamily("Bête")) {
                    nb_beast++;
                }
            }
            this.owner().ressource("Or").produce(nb_beast);
        }
        else if (choice == "destroy" && target != undefined) {
            this.targeting(target);

            target.destroy();
        }

        this.move("Défausse");
        this.pose();
    };
};