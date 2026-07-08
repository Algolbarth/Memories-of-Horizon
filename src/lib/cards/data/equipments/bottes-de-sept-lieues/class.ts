import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class BottesDeSeptLieues extends Equipment {
    name = "Bottes de sept lieues";

    constructor(system: System) {
        super(system);

        this.init([["Or", 70]]);

        this.initFamily(["Armure", "Géant"]);

        this.equipStat("Vitesse").init(7);

        this.addText(`Quand posé : S'équipe à une créature de famille Géant sur votre terrain.`);
        this.addText(`Au début d'une manche : Si équipé et que le porteur est sur le terrain : Augmente de 7 la constitution et la force du porteur.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.isFamily("Géant") && card.canEquip()) {
                return true;
            }
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.owner().zone("Terrain")],
                (target: Card) => {
                    return target instanceof Creature && target.canEquip() && target.isFamily("Géant");
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Creature && card.canEquip() && card.isFamily("Géant")) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    roundEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Constitution").increase(7);
            this.bearer.stat("Force").increase(7);
        }
    };
};