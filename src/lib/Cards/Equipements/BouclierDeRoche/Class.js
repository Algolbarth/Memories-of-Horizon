import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class BouclierDeRoche extends Equipment {
    name = "Bouclier de roche";

    constructor(System) {
        super(System);

        this.init([["Or", 10], ["Terre", 10]]);
        this.equipStat("Défense").base = 10;

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

    defendEffect = function () {
        this.bearer.stat("Défense").add += 2;
    };
}