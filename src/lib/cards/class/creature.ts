import type { System } from '$lib/system/class';
import { Card } from './card';
import { Unit } from './unit';
import type { Equipment } from './equipment';
import { copy } from '$lib/utils';

export class Creature extends Unit {
    type = "Créature";
    equipments: Equipment[] = [];

    constructor(system: System) {
        super(system);

        this.addTrait("Boss", false);

        this.addTrait("Pacifiste", false);
        this.trait("Pacifiste").value = function () {
            if (this.card.stat("Agilité").value() == 0) {
                return true;
            }
            return false;
        };

        this.addStat("Agilité", 1);
        this.stat("Agilité").condition = function () {
            if (this.value() > 1) {
                return true;
            }
            return false;
        };

        this.addStat("Force", 0);
        this.stat("Force").display = function () {
            return true;
        };

        this.addStat("Maniement", 1);
        this.stat("Maniement").condition = function () {
            if (this.value() > 1) {
                return true;
            }
            return false;
        };

        this.addStat("Critique", 0);
        this.stat("Critique").display = function () {
            if (this.condition() || this.card.stat("Adresse").value() > 0) {
                return true;
            }
            return false;
        };

        this.addStat("Adresse", 0);

        this.addStat("Intensité", 2);
        this.stat("Intensité").display = function () {
            if (this.value() != 2 || this.card.stat("Adresse").value() > 0 || this.card.stat("Critique").value() > 0) {
                return true;
            }
            return false;
        };

        this.addStat("Étourdissement", 0);
        this.stat("Étourdissement").debuff = true;

        this.addStat("Poison", 0);
        this.stat("Poison").debuff = true;

        this.addStat("Toxicité", 1, 1);
        this.stat("Toxicité").restriction = function (total: number) {
            if (this.card.stat("Poison").value() > 0) {
                return total;
            }
            else {
                this.set(1);
                return 1;
            }
        };
        this.stat("Toxicité").display = function () {
            if (this.condition() || this.card.stat("Poison").value() > 0) {
                return true;
            }
            return false;
        };
    };

    otherPose = (card: Card) => {
        if (this.otherPoseEffect != undefined) {
            this.otherPoseEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherPoseEffect != undefined) {
                equipment.otherPoseEffect(card);
            }
        }
    };

    otherSell = (card: Card) => {
        if (this.otherSellEffect != undefined) {
            this.otherSellEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherSellEffect != undefined) {
                equipment.otherSellEffect(card);
            }
        }
    };

    mill = () => {
        if (this.millEffect != undefined) {
            this.millEffect();
        }

        for (const equipment of this.equipments) {
            if (equipment.millBearerEffect != undefined) {
                equipment.millBearerEffect();
            }
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherMill(this);
                    }
                }
            }
        }

        this.remove();
    };

    otherMill = (card: Card) => {
        if (this.otherMillEffect != undefined) {
            this.otherMillEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherMillEffect != undefined) {
                equipment.otherMillEffect(card);
            }
        }
    };

    destroy = () => {
        this.stat("Santé").init(0);

        if (this.type == "Créature") {
            this.stat("Initiative").set(this.stat("Maîtrise").value());
        }

        if (this.destroyEffect != undefined) {
            this.destroyEffect();
        }

        for (const equipment of this.equipments) {
            if (equipment.destroyBearerEffect != undefined) {
                equipment.destroyBearerEffect();
            }
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherDetroy(this);
                    }
                }
            }
        }

        this.perish();
    };

    otherDetroy = (card: Card) => {
        if (this.otherDestroyEffect != undefined) {
            this.otherDestroyEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherDestroyEffect != undefined) {
                equipment.otherDestroyEffect(card);
            }
        }
    };

    die = () => {
        this.stat("Santé").init(0);

        if (this.type == "Créature") {
            this.stat("Initiative").set(this.stat("Maîtrise").value());
        }

        if (this.dieEffect != undefined) {
            this.dieEffect();
        }

        for (const equipment of this.equipments) {
            if (equipment.dieBearerEffect != undefined) {
                equipment.dieBearerEffect();
            }
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherDie(this);
                    }
                }
            }
        }

        this.perish();
    };

    otherDie = (card: Unit) => {
        if (this.otherDieEffect != undefined) {
            this.otherDieEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherDieEffect != undefined) {
                equipment.otherDieEffect(card);
            }
        }
    };

    perish = () => {
        if (this.perishEffect != undefined) {
            this.perishEffect();
        }

        for (const equipment of this.equipments) {
            if (equipment.perishBearerEffect != undefined) {
                equipment.perishBearerEffect();
            }
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherPerish(this);
                    }
                }
            }
        }

        if (this.second_life == false) {
            this.move("Défausse");

            if (this.system.view.card == this) {
                this.system.view.reset();
            }
        }
        else {
            this.second_life = false;
        }
    };

    otherPerish = (card: Unit) => {
        if (this.otherPerishEffect != undefined) {
            this.otherPerishEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherPerishEffect != undefined) {
                equipment.otherPerishEffect(card);
            }
        }
    };

    play = () => {
        this.stat("Initiative").decrease(1);

        this.stat("Critique").increase(this.stat("Adresse").value());
        if (this.stat("Critique").value() > 100) {
            this.stat("Critique").set(100);
        }

        if (this.playEffect != undefined) {
            this.playEffect();
        }
        for (const e of this.equipments) {
            if (e.playEffect != undefined) {
                e.playEffect();
            }
        }

        let defender: Unit | undefined = this.findTarget();

        if (defender != undefined) {
            this.fight(defender);
        }
    };

    findTarget = () => {
        let target: Unit | undefined = undefined;

        for (const card of this.adversary().zone("Terrain").cards) {
            if (card instanceof Unit && (target == undefined || card.stat("Charisme").value() > target.stat("Charisme").value())) {
                target = card;
            }
        }

        return target;
    };

    fight = (defender: Unit) => {
        let is_die: boolean = defender.zone!.name != "Terrain";
        let nb_hit: number = this.stat("Agilité").value();

        while (!is_die && nb_hit > 0) {

            if (this.fightEffect != undefined) {
                this.fightEffect(defender);
            }
            for (const e of this.equipments) {
                if (e.fightEffect != undefined) {
                    e.fightEffect(defender);
                }
            }

            for (const entity of [this.owner(), this.adversary()]) {
                for (const zone of entity.zones) {
                    let cpy = copy(zone.cards);
                    for (const card of cpy) {
                        if (card != this) {
                            card.otherFight(this);
                        }
                    }
                }
            }

            defender.defend(this);

            let damage: number = this.stat("Force").value();

            if (this.stat("Critique").value() == 100) {
                this.stat("Critique").remove(100);
                damage = damage * this.stat("Intensité").value();
            }

            let damage_result = defender.physicalDamage(damage, this);

            if (damage_result.die) {
                is_die = true;
                this.kill(defender);
            }

            nb_hit--;
        }
    };

    fightEffect: Function | undefined;

    otherFight = (card: Creature) => {
        if (this.otherFightEffect != undefined) {
            this.otherFightEffect(card);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherFightEffect != undefined) {
                equipment.otherFightEffect(card);
            }
        }
    };

    kill = (defender: Unit) => {
        if (this.killEffect != undefined) {
            this.killEffect(defender);
        }

        for (const equipment of this.equipments) {
            if (equipment.killEffect != undefined) {
                equipment.killEffect(defender);
            }
        }
    };

    killEffect: Function | undefined;

    defend = (attacker: Creature) => {
        if (this.defendEffect != undefined) {
            this.defendEffect(attacker);
        }

        for (const equipment of this.equipments) {
            if (equipment.defendEffect != undefined) {
                equipment.defendEffect(this);
            }
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherDefend(this, attacker);
                    }
                }
            }
        }

        if (this.stat("Épine").value() > 0) {
            attacker.physicalDamage(this.stat("Épine").value(), this);
        }
        if (this.stat("Radiation").value() > 0) {
            attacker.specialDamage(this.stat("Épine").value(), this);
        }
    };

    otherDefend = (defender: Unit, attacker: Creature) => {
        if (this.otherDefendEffect != undefined) {
            this.otherDefendEffect(defender, attacker);
        }

        for (const equipment of this.equipments) {
            if (equipment.otherDefendEffect != undefined) {
                equipment.otherDefendEffect(defender, attacker);
            }
        }
    };

    canEquip = () => {
        if (this.equipments.length < this.stat("Maniement").value()) {
            return true;
        }
        return false;
    };

    equip = (equipment: Equipment) => {
        equipment.remove();

        this.equipments.push(equipment);
        equipment.bearer = this;

        this.owner().ressource("Mana").produce(equipment.equipStat("Magie").value());
        this.owner().ressource("Mana").increase(equipment.equipStat("Magie").value());
    };

    transform = (name: string) => {
        this.area().cards[this.emplacement()] = this.system.cards.getByName(name).getTransform(this);

        for (const equipment of this.equipments) {
            equipment.move("Défausse");
        }

        return this.area().cards[this.emplacement()];
    };

    getTransform = (card: Card) => {
        this.entity = card.entity;
        this.zone = card.zone;
        this.slot = card.slot;

        for (const trait of this.traits) {
            trait.add = card.trait(trait.name).add;
            trait.turn = card.trait(trait.name).turn;
            trait.round = card.trait(trait.name).round;
        }

        for (const stat of this.stats) {
            stat.add = card.stat(stat.name).add;
            stat.turn = card.stat(stat.name).turn;
            stat.round = card.stat(stat.name).round;
        }

        if (card instanceof Unit && this.stat('Santé').value() < 1) {
            this.stat('Santé').set(1);
        }

        if (card instanceof Creature) {
            for (const equipment of card.equipments) {
                equipment.remove();

                this.equipments.push(equipment);
                equipment.bearer = this;
            }
        }

        return this;
    };
};