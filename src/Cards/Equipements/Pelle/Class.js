import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Pelle extends Equipment {
    name = "Pelle";

    constructor(System) {
        super(System);

        this.init([["Or", 18], ["Terre", 18]]);

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

    startStepEffect = function () {
        if (this.bearer != undefined && this.bearer.zone.name == "Terrain") {
            let condition = function (card) {
                if (card.elements.includes("Terre")) {
                    return true;
                }
                return false;
            }
            let cards = this.owner.discover(1, condition);
            this.owner.ressource("Terre").current += cards[0].level;
        }
    };
}