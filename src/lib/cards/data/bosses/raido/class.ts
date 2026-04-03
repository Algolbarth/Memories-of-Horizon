import type { System } from '$lib/system/class';
import type { Card } from '$lib/cards/class/class';
import { Boss } from '$lib/cards/class/boss';
import { Creature } from '$lib/cards/class/creature';

export class Raido extends Boss {
    name = "Raido, chef brutal";

    constructor(system: System) {
        super(system);

        this.level = 2;
        this.elements.base = ["Neutre"];
        this.initFamily(["Humain"]);

        this.stat("Force").init(10);
        this.stat("Constitution").init(50);

        this.addText(`Quand une autre créature alliée est posée : Si sur le terrain : Augmente de 5 la constitution et la force de cette créature.`);
        this.addText(`Quand une unité sur le terrain adverse périt : Produit autant d'or que la constitution max de cette créature.`);
        this.addText(`Quand joue : [prime_inf {1, Augmente de 1 sa constitution et sa force.}]`);
    };

    otherPoseEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isAlly(card) && card instanceof Creature) {
            card.stat("Force").increase(5);
            card.stat("Constitution").increase(5);
        }
    };

    otherPerishEffect = (card: Card) => {
        if (this.isArea("Terrain") && this.isNotAlly(card)) {
            this.owner().ressource("Or").produce(card.stat("Vitalité").value());
        }
    };

    playEffect = () => {
        while (this.owner().ressource("Or").total() >= 1) {
            this.owner().ressource("Or").spend(1);

            this.stat("Force").increase(1);
            this.stat("Constitution").increase(1);
        }
    };
};