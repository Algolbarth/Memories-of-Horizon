import type { System } from '$lib/system/class';
import { Druid } from '$lib/cards/class/druid';
import { Equipment } from '$lib/cards/class/equipment';
import type { Card } from '$lib/cards/class/card';
import type { Creature } from '$lib/cards/class/creature';
import { UserInterface } from '$lib/cards/user-interface/class';

export class BatonDeDruide extends Equipment {
    name = "Bâton de druide";

    constructor(system: System) {
        super(system);

        this.init([["Or", 40]]);

        this.initFamily(["Druide"]);

        this.addText(`Quand posé : S'équipe à une créature de famille Druide sur votre terrain.`);
        this.addText(`À la fin d'une phase de préparation : Si équipé et si le porteur est sur le terrain : Transforme en sa forme alternative le porteur.`);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Druid && card.canEquip()) {
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
                    return target instanceof Druid && target.canEquip();
                },
                (target: Creature) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        let target = undefined;

        for (const card of this.owner().zone("Terrain").cards) {
            if (target == undefined && card instanceof Druid && card.canEquip()) {
                target = card;
            }
        }

        if (target != undefined) {
            this.useEffect(target);
        }
    };

    endPhaseEffect = () => {
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