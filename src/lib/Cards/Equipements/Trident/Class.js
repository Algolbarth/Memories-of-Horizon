import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Trident extends Equipment {
    name = "Trident";

    constructor(System) {
        super(System);

        this.init([["Or", 25], ["Eau", 25]]);
        this.equipStat("Attaque").base = 35;
        this.equipStat("Percée").base = 50;

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

    killEffect = function () {
        this.owner.ressource("Eau").stock += 5;
    };
}