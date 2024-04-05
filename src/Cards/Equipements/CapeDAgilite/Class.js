import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class CapeDAgilite extends Equipment {
    name = "Cape d'agilité";

    constructor(System) {
        super(System);

        this.init([["Or", 20]]);

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

    turnEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            this.bearer.stat("Esquive").turn += 1;
        }
    };
}