import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Action } from '$lib/cards/class/action';
import { UserInterface } from '$lib/cards/user-interface/class';
import type { Card } from '$lib/cards/class/card';

export class SouffleEnflamme extends Action {
    name = "Souffle enflammé";

    constructor(system: System) {
        super(system);

        this.init([["Or", 15], ["Feu", 15]]);

        this.addText(`Quand posé : Inflige 20 dégâts spéciaux à une unité sur le terrain adverse et aux unités adjacentes de cette unité.`);
    };

    canUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 0) {
            return true;
        }
        return false;
    };

    userInterface = () => {
        this.game().user_interface = new UserInterface(this)
            .addTarget(
                [this.adversary().zone("Terrain")],
                (target: Card) => {
                    return true;
                },
                (target: Unit) => {
                    this.useEffect(target);
                    this.closeInterface();
                });
    };

    autoUse = () => {
        if (this.adversary().zone("Terrain").cards.length > 1) {
            this.useEffect(this.adversary().zone("Terrain").cards[1]);
        }
        else {
            this.useEffect(this.adversary().zone("Terrain").cards[0]);
        }
    };

    useEffect = (target: Unit) => {
        this.targeting(target);

        target.specialDamage(20, this);
        if (target.slot != undefined && target.zone) {
            if (target.slot > 0) {
                target.zone.cards[target.slot - 1].specialDamage(20, this);
            }
            if (target.slot < target.zone.cards.length - 1) {
                target.zone.cards[target.slot + 1].specialDamage(20, this);
            }
        }

        this.move("Défausse");
        this.pose();
    };
};