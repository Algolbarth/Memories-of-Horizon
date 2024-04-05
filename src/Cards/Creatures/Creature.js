import {Unit} from '../Unit.js';

export class Creature extends Unit {
    type = "Créature";
    equipments = [];

    constructor (System) {
        super(System);

        this.addStat("Attaque", 0);

        this.addStat("Maniement", 1);

        this.addStat("Adresse", 0);

        this.addStat("Critique", 0);
        this.stat("Critique").current = 0;
    };

    play = function () {
        this.stat("Actions").current--;
        this.playEffect();
        this.stat("Critique").current += this.stat("Adresse").value();
        if (this.stat("Critique").current > 100) {
            this.stat("Critique").current = 100;
        }
        this.fight();
    };

    fight = function () {
        this.fightEffect();
        
        let defender = this.findTarget();

        let isDie = false;
        let repeat = this.stat("Multicoup").value();
        while (!isDie && repeat > 0) {
            let difDamage = this.stat("Attaque").value() - defender.stat("Défense").value();
            if (this.stat("Critique").current == 100) {
                this.stat("Critique").current = 0;
                difDamage += difDamage;
            }
            if (difDamage < 0) {
                difDamage = 0;
            }
            let damage_result = this.findTarget().damage(difDamage);
            if (damage_result.die) {
                isDie = true;
                this.killEffect();
                for (const card of this.equipments) {
                    card.killEffect();
                }
            }
            repeat--;
        }
    };

    fightEffect = function () {

    };

    killEffect = function () {

    };

    findTarget = function () {
        let target = undefined;
        for (const card of this.owner.adversary().zone("Terrain").cards) {
            if (target == undefined || card.stat("Protection").value() > target.stat("Protection").value()) {
                target = card;
            }
        }
        return target;
    };

    canEquip = function () {
        if (this.equipments.length < this.stat("Maniement").value()) {
            return true;
        }
        return false;
    };

    equip = function (equipment) {
        this.equipments.push(equipment);
        equipment.remove();
        equipment.bearer = this;

        this.owner.ressource("Mana").current += equipment.equipStat("Magie").value();
        this.owner.ressource("Mana").max += equipment.equipStat("Magie").value();
    };
}