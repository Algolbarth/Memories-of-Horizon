import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class HacheDeFer extends Equipment {
    name = "Hache de fer";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.equipStat("Adresse").base = 30;
        this.equipStat("Intensité").base = 1;

        this.text = Text;
    };

    use = function () {
        this.select();
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            let target = undefined;

            for (const card of this.owner.zone("Terrain").cards) {
                if (target == undefined && card.type == "Créature" && card.canEquip()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.equip(this);
        this.pose();
    };
}