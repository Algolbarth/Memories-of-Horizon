import type { System } from '$lib/system/class';
import { Druid } from '$lib/cards/class/druid';
import { Equipment } from '$lib/cards/class/equipment';
import Use from './use.svelte';

export class BatonDeDruide extends Equipment {
    name = "Bâton de druide";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.initFamily(["Druide"]);

        this.addText(`Quand posé : S'équipe à une créature de famille Druide sur votre terrain.`);
        this.addText(`Au début de la phase de combat et à la fin de la phase de préparation adverse : Si équipé et si le porteur est sur le terrain : Transforme en sa forme alternative le porteur.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Druid && card.canEquip()) {
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
                if (target == undefined && card instanceof Druid && card.canEquip()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    startBattleEffect = () => {
        if (this.bearer != undefined && this.bearer instanceof Druid) {
            this.bearer.transform(this.bearer.alternative_form);
        }
    };

    endAdversaryPhaseEffect = () => {
        if (this.bearer != undefined && this.bearer instanceof Druid) {
            this.bearer.transform(this.bearer.alternative_form);
        }
    };
};