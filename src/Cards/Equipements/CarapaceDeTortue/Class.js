import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class CarapaceDeTortue extends Equipment {
    name = "Carapace de tortue";

    constructor(System) {
        super(System);

        this.init([["Or", 8], ["Eau", 8]]);
        this.familles.base.push("Reptile");
        this.equipStat("Défense").base = 15;

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