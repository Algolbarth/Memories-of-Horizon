import type { System } from '$lib/system/class';
import type { Unit } from '$lib/cards/class/unit';
import { Creature } from '$lib/cards/class/creature';
import { Item } from '$lib/cards/class/item';
import Use from './use.svelte';

export class Concoction extends Item {
    name = "Concoction";

    constructor(system: System) {
        super(system);

        this.level = 1;
        this.initFamily(["Potion"]);

        this.addStat("Infusion de soin", 0);
        this.addStat("Infusion de mana", 0);
        this.addStat("Infusion de force", 0);
        this.addStat("Infusion d'endurance", 0);
        this.addStat("Infusion de résistance", 0);
        this.addStat("Infusion interdite", 0);
        this.addStat("Infusion explosive", 0);
        this.addStat("Infusion parfumée", 0);

        this.trait("Rare").init(true);

        this.addText(`Quand posé : Applique des effets en fonction des différentes valeurs d'infusion.`);
        this.addText([
            `[details
            
            {[if {card.stat("Infusion de mana").value() > 0, Produit {card.stat("Infusion de mana").value()} mana.{jump:1}}]

            [if {card.stat("Infusion interdite").value() > 0, Génère {card:Homonculus} sur votre terrain. Fixe à {card.stat("Infusion interdite").value()} la constitution et la force de cette carte.{jump:1}}]

            [if {card.stat("Infusion explosive").value() > 0, Inflige {card.stat("Infusion explosive").value() * 2} dégâts spéciaux à une unité sur le terrain.{jump:1}}]

            [if {card.stat("Infusion de soin").value() > 0, Soigne {card.stat("Infusion de soin").value() * 2} blessures à une créature sur le terrain.{jump:1}}]

            [if {card.stat("Infusion de force").value() > 0, Augmente de {card.stat("Infusion de force").value() * 4} la force d'une créature sur le terrain pendant ce tour.{jump:1}}]

            [if {card.stat("Infusion d'endurance").value() > 0, Augmente de {card.stat("Infusion d'endurance").value() * 2} l'endurance d'une créature sur le terrain pendant ce tour.{jump:1}}]

            [if {card.stat("Infusion de résistance").value() > 0, Augmente de {card.stat("Infusion de résistance").value() * 2} la résistance d'une créature sur le terrain pendant ce tour.{jump:1}}]

            [if {card.stat("Infusion parfumée").value() > 0, Augmente de {Math.floor(card.stat("Infusion parfumée").value() / 5)} le charisme d'une créature sur le terrain pendant ce tour.}]}]`,
        ], () => {
            return this.hasInfusion();
        });
    };

    canUse = () => {
        if (this.stat("Infusion de mana").value() > 0 || this.stat("Infusion interdite").value() > 0) {
            return true;
        }
        if (this.stat("Infusion explosive").value() > 0) {
            if (this.owner().zone("Terrain").cards.length > 0 || this.owner().adversary().zone("Terrain").cards.length > 0) {
                return true;
            }
        }
        for (const entity of [this.owner(), this.adversary()]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card instanceof Creature) {
                    return true;
                }
            }
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            let check = false;

            if (this.stat("Infusion explosive").value() > 0) {
                if (this.owner().zone("Terrain").cards.length > 0 || this.adversary().zone("Terrain").cards.length > 0) {
                    check = true;
                }
            }
            for (const entity of [this.owner(), this.adversary()]) {
                for (const card of entity.zone("Terrain").cards) {
                    if (card instanceof Creature) {
                        check = true;
                    }
                }
            }

            if (check) {
                this.system.game.use.set(this, Use);
            }
            else {
                this.useEffect(undefined);
            }
        }
        else {
            let target = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
            else {
                this.useEffect(undefined);
            }
        }
    };

    hasInfusion = () => {
        for (const stat of this.stats) {
            if (stat.name.includes("Infusion") && stat.value() > 0) {
                return true;
            }
        }
        return false;
    };

    useEffect = (target: Unit | undefined) => {
        this.owner().ressource("Mana").produce(this.stat("Infusion de mana").value());

        if (this.stat("Infusion interdite").value() > 0) {
            let homonculus = this.owner().getCard("Homonculus");
            homonculus.stat("Constitution").init(this.stat("Infusion interdite").value());
            homonculus.stat("Force").init(this.stat("Infusion interdite").value());
            homonculus.add("Terrain");
        }

        if (target != undefined) {
            this.targeting(target);

            target.specialDamage(this.stat("Infusion explosive").value() * 2, this);

            if (target instanceof Creature) {
                target.heal(this.stat("Infusion de soin").value() * 2);
                target.stat("Force").turn += this.stat("Infusion de force").value() * 4;
                target.stat("Endurance").turn += this.stat("Infusion d'endurance").value() * 2;
                target.stat("Résistance").turn += this.stat("Infusion de résistance").value() * 2;
                target.stat("Charisme").turn += Math.floor(this.stat("Infusion parfumée").value() / 5);
            }
        }

        this.move("Défausse");
        this.pose();
    };

    infuse = (potion: Item) => {
        if (potion.name == "Concoction") {
            for (const stat of potion.stats) {
                if (stat.name.includes("Infusion")) {
                    this.stat(stat.name).increase(stat.value());
                }
            }
        }
        else {
            let infusion_name = potion.name.replace('Potion', 'Infusion');
            this.stat(infusion_name).increase(potion.stat("Infusion").value());
        }
    };
};