import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class CollierEnDentDeLoup extends Equipment {
    name = "Collier en dent de loup";

    constructor(System) {
        super(System);

        this.init([["Or", 50]]);
        this.familles.base.push("Bête");

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

    otherDieEffect = function (card) {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain" && card.type == "Créature" && card.owner == this.bearer.owner && card.familles.total().includes("Bête")) {
            this.bearer.stat("Attaque").add += 10;
        }
    };
}