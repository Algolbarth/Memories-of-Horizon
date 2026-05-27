import type { System } from '$lib/system/class';
import { copy } from '$lib/utils';
import type { Creature } from './creature';
import { Card } from './card';

export class Unit extends Card {
    constructor(system: System) {
        super(system);

        this.addTrait("Inactif", false);
        this.trait("Inactif").value = function () {
            if (this.card.stat("Maîtrise").value() == 0) {
                return true;
            }
            return false;
        };

        this.addStat("Santé", 1);
        this.stat("Santé").display = () => {
            return false;
        };

        this.addStat("Vitalité", 1, 1);
        this.stat("Vitalité").display = () => {
            return false;
        };

        this.addStat("Constitution", 0);
        this.stat("Constitution").display = () => {
            return false;
        };
        this.stat("Constitution").value = () => {
            return this.stat("Vitalité").value();
        };
        this.stat("Constitution").increase = function (value: number) {
            this.card.stat("Santé").increase(value);
            this.card.stat("Vitalité").increase(value);
        };
        this.stat("Constitution").decrease = function (value: number) {
            this.card.stat("Santé").decrease(value);
            this.card.stat("Vitalité").decrease(value);
        };
        this.stat("Constitution").init = function (value: number) {
            this.card.stat("Santé").init(value);
            this.card.stat("Vitalité").init(value);
        };
        this.stat("Constitution").set = function (value: number) {
            this.card.stat("Santé").set(value);
            this.card.stat("Vitalité").set(value);
        };

        this.addStat("Garde", 0);

        this.addStat("Régénération", 0);

        this.addStat("Endurance", 0);

        this.addStat("Résistance", 0);

        this.addStat("Épine", 0);

        this.addStat("Radiation", 0);

        this.addStat("Initiative", 1);
        this.stat("Initiative").display = function () {
            if (this.card.system.game?.phase == "Combat" || this.value() != this.card.stat("Maîtrise").value()) {
                return true;
            }
            return false;
        };

        this.addStat("Maîtrise", 1);
        this.stat("Maîtrise").condition = function () {
            if (this.value() > 1) {
                return true;
            }
            return false;
        };

        this.addStat("Portée", 0);

        this.addStat("Psychisme", 0);

        this.addStat("Vitesse", 0);

        this.addStat("Charisme", 0);

        this.addStat("Esquive", 0);

        this.addStat("Magie", 0);

        this.addStat("Intelligence", 0);

        this.addStat("Brûlure", 0);
        this.stat("Brûlure").debuff = true;
    };

    canUse = () => {
        if (this.owner().zone("Terrain").isNotFull()) {
            return true;
        }
        return false;
    };

    select = () => {
        this.useEffect();
    };

    useEffect: Function = () => {
        this.move("Terrain");
        this.pose();
    };

    heal = (value: number) => {
        this.stat("Santé").increase(value);
        if (this.stat("Santé").value() > this.stat("Vitalité").value()) {
            this.stat("Santé").set(this.stat("Vitalité").value());
        }
    };

    fullHeal = () => {
        this.stat("Santé").set(this.stat("Vitalité").value());
    };

    isFullLife = () => {
        return this.stat("Santé").value() == this.stat("Vitalité").value();
    };

    isDamaged = () => {
        return this.stat("Santé").value() < this.stat("Vitalité").value();
    };

    specialDamage = (value: number, source: Card) => {
        let damage_reduction: number = this.stat("Résistance").value() - source.stat("Pénétration").value();
        if (damage_reduction < 0) {
            damage_reduction = 0;
        }

        let damage: number = value - damage_reduction;
        if (damage < 0) {
            damage = 0;
        }

        return this.damage(damage, source);
    };

    physicalDamage = (value: number, source: Card) => {
        let damage_reduction: number = this.stat("Endurance").value() - source.stat("Percée").value();
        if (damage_reduction < 0) {
            damage_reduction = 0;
        }

        let damage: number = value - damage_reduction;
        if (damage < 0) {
            damage = 0;
        }

        return this.damage(damage, source);
    };

    damage = (value: number, source: Card) => {
        let result = {
            value: value,
            die: false
        };

        if (this.stat("Esquive").value() == 0) {
            if (result.value < 0) {
                result.value = 0;
            }

            if (this.stat("Garde").value() > result.value) {
                this.stat("Garde").remove(result.value);
                result.value = 0;
            }
            else {
                result.value -= this.stat("Garde").value();
                this.stat("Garde").remove(this.stat("Garde").value());
            }

            this.stat("Santé").remove(result.value);

            if (this.stat("Santé").value() <= 0) {
                result.die = true;
                this.die();
            }
        }
        else {
            result.value = 0;
            this.stat("Esquive").remove(1);
        }

        return result;
    };

    die = () => {
        this.stat("Santé").init(0);

        if (this.type == "Créature") {
            this.stat("Initiative").set(this.stat("Maîtrise").value());
        }

        if (this.dieEffect != undefined) {
            this.dieEffect();
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

    dieEffect: Function | undefined;

    destroy = () => {
        this.stat("Santé").init(0);

        if (this.type == "Créature") {
            this.stat("Initiative").set(this.stat("Maîtrise").value());
        }

        if (this.destroyEffect != undefined) {
            this.destroyEffect();
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

    play = () => {
        this.stat("Initiative").decrease(1);

        if (this.playEffect != undefined) {
            this.playEffect();
        }
    };

    playEffect: Function | undefined;

    defend = (attacker: Creature) => {
        if (this.defendEffect != undefined) {
            this.defendEffect(attacker);
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
            attacker.specialDamage(this.stat("Épine").value(), this);
        }
    };

    defendEffect: Function | undefined;

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

        return this;
    };
};