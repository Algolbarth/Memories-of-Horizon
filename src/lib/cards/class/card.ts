import { Stat } from "./stat";
import { Trait } from "./trait";
import { Elements } from "./element";
import { Cost } from "./cost";
import { copy } from "$lib/utils";
import { Families } from "./family";
import type { System } from "$lib/system/class";
import { Entity } from "$lib/game/entity";
import { Zone } from "$lib/game/zone";
import type { Unit } from "./unit";
import type { Creature } from "./creature";
import { Effect } from "./effect";

export class Card {
    name: string = "Carte";
    cost: Cost[] = [];
    sale: Cost[] = [];
    level: number = 0;
    type: string = "Carte";
    families: Families = new Families(this);
    traits: Trait[] = [];
    stats: Stat[] = [];
    elements: Elements = new Elements(this);
    system: System;
    locked: boolean = false;
    slot: number | undefined;
    zone: Zone | undefined;
    entity: Entity | undefined;
    effects: Effect[] = [];
    cache: boolean = false;
    alternative_form: string | undefined;
    second_life: boolean = false;

    constructor(system: System) {
        this.system = system;

        this.addTrait("Légendaire", false);

        this.addTrait("Rare", false);

        this.addTrait("Commune", false);
        this.trait("Commune").value = function () {
            if (this.card.trait("Légendaire").value() || this.card.trait("Rare").value()) {
                return false;
            }
            return true;
        };

        this.addTrait("Limité", false);

        this.addStat(203, "Percée", 0);
        this.addStat(213, "Pénétration", 0);

        this.addStat(404, "Perception", 0);

        this.addStat(501, "Persistance", 0);
        this.addStat(502, "Amélioration", 0);
        this.addStat(503, "Éveil", 0);

        for (const ressource of system.ressources.list) {
            this.cost.push(new Cost(ressource.name, this));
            this.sale.push(new Cost(ressource.name, this));
        }
    };

    init = (array: any[]) => {
        let total = 0;
        for (const element of array) {
            this.getCost(element[0]).base += element[1];
            total += element[1];
            if (element[0] != "Or") {
                this.elements.base.push(element[0]);
            }
        }
        if (this.elements.base.length == 0) {
            this.elements.base.push("Neutre");
        }

        if (this.level == 0) {
            this.level = Math.floor((total - 1) / 10) + 1;
            if (this.level > 20) {
                this.level = 20;
            }
        }

        let total_sale = 0;
        for (const element of array) {
            this.getSale(element[0]).base += Math.floor(element[1] / 2);
            total_sale += Math.floor(element[1] / 2);
        }
        if (total_sale * 2 + 1 < total) {
            this.getSale("Or").base += 1;
        }
    };

    initFamily = (families: string[]) => {
        for (const family of families) {
            this.families.base.push(family);
        }
    };

    isElement = (element: string) => {
        return this.elements.total().includes(element);
    };

    getCost = (name: string) => {
        for (const c of this.cost) {
            if (c.name == name) {
                return c;
            }
        }
        return new Cost(name, this);
    };

    getSale = (name: string) => {
        for (const v of this.sale) {
            if (v.name == name) {
                return v;
            }
        }
        return new Cost(name, this);
    };

    costTotal = () => {
        let total = 0;
        for (const cost of this.cost) {
            total += cost.value();
        }
        return total;
    };

    costReduce = (value: number) => {
        while (value > 0) {
            let best = this.getCost("Or");
            for (const cost of this.cost) {
                if (cost.value() > best.value()) {
                    best = cost;
                }
            }
            best.base--;
            value--;
        }
    };

    saleTotal = () => {
        let total = 0;
        for (const sale of this.sale) {
            total += sale.value();
        }
        return total;
    };

    isFamily = (family: string) => {
        return this.families.total().includes(family);
    };

    remove = () => {
        if (this.entity != undefined && this.zone != undefined && this.slot != undefined) {
            if (this.checkStat("Magie") != undefined && this.isArea("Terrain")) {
                this.owner().ressource("Mana").decrease(this.stat("Magie").value());
            }

            if (this.removeEffect != undefined) {
                this.removeEffect(this.zone.name);
            }

            this.zone.cards.splice(this.slot, 1);
            for (let i = this.slot; i < this.zone.cards.length; i++) {
                let card = this.zone.cards[i];
                if (card.slot != undefined) {
                    card.slot--;
                }
            }
            this.zone = undefined;
            this.slot = undefined;
        }
    };

    removeEffect: Function | undefined;

    add = (zone_name: string, entity: Entity = this.owner()) => {
        if (entity.zone(zone_name).isNotFull()) {
            this.entity = entity;
            this.zone = entity.zone(zone_name);
            this.slot = entity.zone(zone_name).cards.length;

            if (zone_name == "Défausse") {
                this.stat("Persistance").add = 2;
            }
            else {
                this.stat("Persistance").set(0);
            }

            if (!["Inventaire", "Pile"].includes(zone_name)) {
                this.cache = false;
            }

            if (this.checkStat("Magie") != undefined && zone_name == "Terrain") {
                entity.ressource("Mana").produce(this.stat("Magie").value());
                entity.ressource("Mana").increase(this.stat("Magie").value());
            }

            if (this.addEffect != undefined) {
                this.addEffect(zone_name);
            }

            entity.zone(zone_name).cards.push(this);
        }
    };

    addEffect: Function | undefined;

    move = (zone: string, entity: Entity | undefined = this.entity) => {
        this.remove();
        this.add(zone, entity);
    };

    up = () => {
        if (this.entity != undefined && this.zone != undefined && this.slot != undefined && this.zone.cards[this.slot - 1] != undefined) {
            let temp: Card = this.zone.cards[this.slot - 1];

            this.zone.cards[this.slot - 1] = this;
            this.zone.cards[this.slot] = temp;

            if (temp.slot != undefined) {
                temp.slot++;
            }
            this.slot--;
        }
    };

    down = () => {
        if (this.entity != undefined && this.zone != undefined && this.slot != undefined && this.zone.cards[this.slot + 1] != undefined) {
            let temp = this.zone.cards[this.slot + 1];

            this.zone.cards[this.slot + 1] = this;
            this.zone.cards[this.slot] = temp;

            if (temp.slot != undefined) {
                temp.slot--;
            }
            this.slot++;
        }
    };

    canBuy = () => {
        for (const c of this.cost) {
            if (c.value() > this.owner().ressource(c.name).total()) {
                return false;
            }
        }

        if (this.owner().zone("Inventaire").isFull()) {
            return false;
        }

        return true;
    };

    buy = () => {
        if (this.canBuy()) {
            for (const c of this.cost) {
                this.owner().ressource(c.name).spend(c.value());
            }

            for (const c of this.cost) {
                c.reset();
            }

            this.locked = false;

            this.move("Inventaire");
        }
    };

    lock = () => {
        this.locked = true;
    };

    unlock = () => {
        this.locked = false;
    };

    sell = () => {
        if (this.sellEffect != undefined) {
            this.sellEffect();
        }

        for (const sale of this.sale) {
            this.owner().ressource(sale.name).produce(sale.value());
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cards: Card[] = copy(zone.cards);
                for (const card of cards) {
                    if (card != this) {
                        card.otherSell(this);
                    }
                }
            }
        }

        this.remove();
    };

    otherSell = (card: Card) => {
        if (this.otherSellEffect != undefined) {
            this.otherSellEffect(card);
        }
    };

    sellEffect: Function | undefined;

    otherSellEffect: Function | undefined;

    canUse = () => {
        return true;
    };

    use = () => {
        this.select();
    };

    select = () => {
        this.useEffect();
    };

    useEffect: Function = () => {
        this.move("Défausse");
        this.pose();
    };

    pose = () => {
        this.cache = false;

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cards: Card[] = copy(zone.cards);
                for (const card of cards) {
                    if (card != this) {
                        card.otherPose(this);
                    }
                }
            }
        }
    };

    otherPose = (card: Card) => {
        if (this.otherPoseEffect != undefined) {
            this.otherPoseEffect(card);
        }
    };

    otherPoseEffect: Function | undefined;

    mill = () => {
        if (this.millEffect != undefined) {
            this.millEffect();
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cards: Card[] = copy(zone.cards);
                for (const card of cards) {
                    if (card != this) {
                        card.otherMill(this);
                    }
                }
            }
        }

        this.remove();
    };

    millEffect: Function | undefined;

    otherMill = (card: Card) => {
        if (this.otherMillEffect != undefined) {
            this.otherMillEffect(card);
        }
    };

    otherMillEffect: Function | undefined;

    canBeDestroyed = () => {
        if (!this.trait("Légendaire").value()) {
            return true;
        }
        return false;
    };

    destroy = () => {
        if (this.destroyEffect != undefined) {
            this.destroyEffect();
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cards: Card[] = copy(zone.cards);
                for (const card of cards) {
                    if (card != this) {
                        card.otherDetroy(this);
                    }
                }
            }
        }

        this.die();
    };

    destroyEffect: Function | undefined;

    otherDetroy = (card: Card) => {
        if (this.otherDestroyEffect != undefined) {
            this.otherDestroyEffect(card);
        }
    };

    otherDestroyEffect: Function | undefined;

    otherDefeat = (card: Unit) => {
        if (this.otherDefeatEffect != undefined) {
            this.otherDefeatEffect(card);
        }
    };

    otherDefeatEffect: Function | undefined;

    die = () => {
        if (this.dieEffect != undefined) {
            this.dieEffect();
        }

        for (const entity of [this.owner(), this.adversary()]) {
            for (const zone of entity.zones) {
                let cards: Card[] = copy(zone.cards);
                for (const card of cards) {
                    if (card != this) {
                        card.otherDie(this);
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

    dieEffect: Function | undefined;

    otherDie = (card: Card) => {
        if (this.otherDieEffect != undefined) {
            this.otherDieEffect(card);
        }
    };

    otherDieEffect: Function | undefined;

    startPhaseEffect: Function | undefined;

    startAdversaryPhaseEffect: Function | undefined;

    endPhaseEffect: Function | undefined;

    endAdversaryPhaseEffect: Function | undefined;

    startBattleEffect: Function | undefined;

    roundEffect: Function | undefined;

    otherAttack = (card: Creature) => {
        if (this.otherAttackEffect != undefined) {
            this.otherAttackEffect(card);
        }
    };

    otherAttackEffect: Function | undefined;

    otherDefend = (defender: Unit, attacker: Creature) => {
        if (this.otherDefendEffect != undefined) {
            this.otherDefendEffect(defender, attacker);
        }
    };

    otherDefendEffect: Function | undefined;

    refreshStackEffect: Function | undefined;

    readCardEffect: Function | undefined;

    drawCardEffect: Function | undefined;

    discoverCardEffect: Function | undefined;

    description = () => {
        return "...";
    };

    checkStat = (name: string) => {
        for (const s of this.stats) {
            if (name == s.name) {
                return s;
            }
        }
        return undefined;
    };

    stat = (name: string) => {
        let check = this.checkStat(name);
        if (check == undefined) {
            console.log(name + " n'est pas une stat pour " + this.name);
            return new Stat(0, name, 0, 0, this);
        }
        return check;
    };

    addStat = (code: number, name: string, value: number, min: number = 0) => {
        for (const stat of this.stats) {
            if (stat.code == code) {
                console.log("Le code " + code + " est déjà pris par la stat " + stat.name);
                return 0;
            }
            if (stat.name == name) {
                console.log("La stat " + name + " existe déjà");
                return 0;
            }
        }

        let stat: Stat = new Stat(code, name, value, min, this);
        for (let i = 0; i < this.stats.length; i++) {
            if (this.stats[i].code > stat.code) {
                this.stats.splice(i, 0, stat);
                return 0;
            }
        }
        this.stats.push(stat);
    };

    displayStat = () => {
        for (const s of this.stats) {
            if (s.display()) {
                return true;
            }
        }
        return false;
    };

    hasDebuff = () => {
        for (const s of this.stats) {
            if (s.debuff && s.condition()) {
                return true;
            }
        }
        return false;
    };

    trait = (name: string) => {
        for (const t of this.traits) {
            if (name == t.name) {
                return t;
            }
        }
        return new Trait(name, false, this);
    };

    addTrait = (name: string, value: boolean) => {
        this.traits.push(new Trait(name, value, this));
    };

    displayTrait = () => {
        for (const t of this.traits) {
            if (t.display()) {
                return true;
            }
        }
        return false;
    };

    transform = (name: string) => {
        this.area().cards[this.emplacement()] = this.system.cards.getByName(name).getTransform(this);

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

        return this;
    };

    reincarnate = (name: string) => {
        let transformation = this.transform(name);

        transformation.stat("Santé").reset();
        transformation.stat("Santé").init(transformation.stat("Vitalité").value());

        this.second_life = true;
    };

    targeting = (target: Card) => {
        if (target.targetEffect != undefined) {
            target.targetEffect(this);
        }
        return true;
    };

    targetEffect: Function | undefined;

    isAlly = (card: Card) => {
        return card.entity == this.entity;
    };

    isNotAlly = (card: Card) => {
        return !this.isAlly(card);
    };

    isArea = (name: string) => {
        return this.area().name == name;
    };

    isNotArea = (name: string) => {
        return !this.isArea(name);
    };

    area = () => {
        if (this.zone != undefined) {
            return this.zone;
        }
        console.log("error");
        return new Zone("Test");
    };

    emplacement = () => {
        if (this.slot != undefined) {
            return this.slot;
        }
        console.log("error");
        return 0;
    };

    owner = () => {
        if (this.entity != undefined) {
            return this.entity;
        }
        console.log("error");
        return new Entity(this.system);
    };

    adversary = () => {
        if (this.entity != undefined) {
            return this.entity.opponent;
        }
        console.log("error");
        return new Entity(this.system);
    };

    addText = (lines: string[] | string, condition: (() => boolean) | undefined = undefined) => {
        let text: string[] = [];

        if (typeof lines === "string") {
            text = [lines];
        }
        else {
            text = lines;
        }

        this.effects.push(new Effect(this, text, condition, "text"));
    };

    addChoice = (choices: (string | string[])[], before: string[] | string | undefined = undefined, after: string[] | string | undefined = undefined, condition: (() => boolean) | undefined = undefined) => {
        let text: string = "";

        if (before == undefined) {
            text = text + "Quand posé : Au choix : ";
        }
        else if (typeof before === "string") {
            text = text + before;
        }
        else {
            for (const line of before) {
                text = text + line;
            }
        }

        text = text + "[choice {";
        for (const choice of choices) {
            if (typeof choice === "string") {
                text = text + "[option {0, " + choice + "}]";
            }
            else {
                text = text + "[option {0, ";
                for (const line of choice) {
                    text = text + line + "<br />";
                }
                text = text + "}]";
            }

        }
        text = text + "}]";

        if (typeof after === "string") {
            text = text + after;
        }
        else if (after != undefined) {
            for (const line of after) {
                text = text + line;
            }
        }

        this.effects.push(new Effect(this, [text], condition, "choice"));
    };
};