import { Equipment } from '../Equipement.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class DagueDeCuivre extends Equipment {
    name = "Dague de cuivre";

    constructor(System) {
        super(System);

        this.init([["Or", 3]]);
        this.equipStat("Attaque").base = 5;

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
                this.useEffect(target, "equip");
                return 0;
            }

            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0], "damage");
            }
        }
    };

    useEffect = function (target, choice) {
        if (choice == "equip") {
            target.equip(this);
        }
        else if (choice == "damage") {
            target.damage(5);
            this.move("Défausse");
        }
        this.pose();
    };
}