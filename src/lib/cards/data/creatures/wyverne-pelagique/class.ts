import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/card';
import { Creature } from '$lib/cards/class/creature';
import type { Unit } from '$lib/cards/class/unit';

export class WyvernePelagique extends Creature {
    name = "Wyverne pélagique";

    constructor(system: System) {
        super(system);

        this.level = 10;
        this.init([["Or", 90], ["Eau", 90]]);

        this.initFamily(["Reptile", "Wyverne", "Poisson"]);

        this.stat("Constitution").init(25);
        this.stat("Force").init(25);

        this.addText(`Quand une carte alliée de famille Poisson est posée : Si sur la pile : Réduit de 10 son coût.`);
        this.addText(`Quand posé : Pioche 1 créature de famille Poisson.`);
        this.addText(`Quand attaque : Inflige 5 dégâts spéciaux à l'unité attaquée pour chaque créature de famille Poisson sur votre pile.`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Pile") && this.isAlly(card) && card.isFamily("Poisson")) {
            this.costReduce(10);
        }
    };

    useEffect = () => {
        let readCondition = (card: Card) => {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                return true;
            }
            return false;
        };
        this.owner().draw(1, readCondition);

        this.move("Terrain");
        this.pose();
    };

    fightEffect = (defender: Unit) => {
        let damage: number = 0;
        for (const card of this.owner().zone("Pile").cards) {
            if (card instanceof Creature && card.isFamily("Poisson")) {
                damage += 5;
            }
        }

        defender.specialDamage(damage, this);
    };
};