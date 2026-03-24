import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Knight, MountedKnight } from '$lib/cards/class/knight';
import Use from './use.svelte';

export class ChevalierNoir extends Knight {
    name = "Chevalier noir";
    alternative_form = "Chevalier noir (monté)";

    constructor(system: System) {
        super(system);

        this.init([["Or", 30]]);

        this.initFamily(["Humain", "Chevalier"]);

        this.stat("Constitution").init(15);
        this.stat("Force").init(15);
        this.stat("Endurance").init(5);
        this.stat("Résistance").init(5);

        this.addText(`Quand périt : [prime {20, fixe à 1 sa santé et reste sur le terrain.}]`);
    };

    perishEffect = () => {
        if (this.owner().ressource("Or").total() >= 20) {
            this.owner().ressource("Or").spend(20);
            this.stat("Santé").init(1);
            this.second_life = true;
        }
    };
};

export class ChevalierNoirMonte extends MountedKnight {
    name = "Chevalier noir (monté)";
    alternative_form = "Chevalier noir";

    constructor(system: System) {
        super(system);

        this.init([["Or", 60]]);

        this.initFamily(["Humain", "Chevalier"]);

        this.stat("Constitution").init(10);
        this.stat("Force").init(20);
        this.stat("Vitesse").init(1);

        this.addText([
            `Quand posé : Inflige autant de dégâts que possible à une unité sur le terrain adverse.`,
            `Dépense autant d'or que de dégâts infligés.`]);
        this.addText(`Quand périt : Se réincarne en {card:Chevalier noir}.`);
    };

    select = () => {
        if (this.owner().is_player) {
            if (this.adversary().zone("Terrain").cards.length > 0) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect(undefined);
            }
        }
        else {
            if (this.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.adversary().zone("Terrain").cards[0]);
            }
            else {
                this.useEffect(undefined);
            }
        }
    };

    useEffect = (target: Unit) => {
        if (target != undefined) {
            let value = target.stat("Santé").value();
            if (this.owner().ressource("Or").total() < value) {
                value = this.owner().ressource("Or").total();
            }
            this.owner().ressource("Or").spend(value);

            target.damageByEffect(value);
        }

        this.move("Terrain");
        this.pose();
    };
};