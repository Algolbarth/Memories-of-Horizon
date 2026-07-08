import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';
import { Item } from '$lib/cards/class/item';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class Restaurant extends Building {
    name = "Restaurant";
    product: string | undefined = undefined;

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.stat("Constitution").init(20);

        this.addText(`Quand posé : Choisit un objet de famille Nourriture de niveau 2 ou moins dans votre inventaire.`);
        this.addText(`Quand se prépare sur le terrain : Génère un objet de même nom que l'objet choisi dans votre inventaire.`);
        this.addText(`[details {Objet choisi : {card:{card.product}}}]`, () => { return this.product != undefined; });
    };

    userInterface = () => {
        let check = undefined;

        for (const card of this.owner().zone("Inventaire").cards) {
            if (check == undefined && card instanceof Item && card.isFamily("Nourriture") && card.level <= 2) {
                check = card;
            }
        }

        if (check != undefined) {
            this.game().user_interface = new UserInterface(this)
                .addTarget(
                    [this.owner().zone("Inventaire")],
                    (target: Card) => {
                        return target instanceof Item && target.isFamily("Nourriture") && target.level <= 2;
                    },
                    (target: Item) => {
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

        for (const card of this.owner().zone("Inventaire").cards) {
            if (target == undefined && card instanceof Item && card.isFamily("Nourriture") && card.level <= 2) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    useEffect = (target: Item | undefined = undefined) => {
        if (target != undefined) {
            this.product = target.name;
        }

        this.move("Terrain");
        this.pose();
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain") && this.product != undefined) {
            this.owner().getCard(this.product).add("Inventaire");
        }
    };
};