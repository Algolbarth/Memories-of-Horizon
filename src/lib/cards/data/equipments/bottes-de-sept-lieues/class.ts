import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';
import { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

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

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            let target = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature && card.isFamily("Géant") && card.canEquip()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    roundEffect = () => {
        if (this.bearer != undefined && this.bearer.isArea("Terrain")) {
            this.bearer.stat("Constitution").increase(7);
            this.bearer.stat("Force").increase(7);
        }
    };
};