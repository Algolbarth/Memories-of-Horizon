export class Card {
    name = "Carte";
    cout = [];
    vente = [];
    elements = [];
    familles = {
        base: [],
        add: [],
        step: [],
        total: function () {
            let array = [];
            for (const b of this.base) {
                array.push(b);
            }
            for (const a of this.add) {
                array.push(a);
            }
            for (const s of this.step) {
                array.push(s);
            }
            return array;
        }
    };
    traits = [];
    stats = [];

    verrou = false;

    constructor(System) {
        this.System = System;

        this.addTrait("Légendaire", false);

        this.addTrait("Rare", false);

        this.addStat("Perpétuité", 0);
        this.stat("Perpétuité").current = 0;

        for (const ressource of System.ressources) {
            this.cout.push(new Cout(ressource, 0, this));
            this.vente.push(new Cout(ressource, 0, this));
        }
    };

    init = function (array) {
        let total = 0;
        for (const element of array) {
            this.getCout(element[0]).base += element[1];
            total += element[1];
            if (element[0] != "Or") {
                this.elements.push(element[0]);
            }
        }

        this.level = parseInt((total - 1) / 10) + 1;
        if (this.level > 20) {
            this.level = 20;
        }
        if (this.elements.length == 0) {
            this.elements.push("Neutre");
        }

        let total_vente = 0;
        for (const element of array) {
            this.getVente(element[0]).base += parseInt(element[1] / 2);
            total_vente += parseInt(element[1] / 2);
        }
        if (total_vente * 2 + 1 < total) {
            this.getVente("Or").base++;
        }
    };

    getCout = function (name) {
        for (const c of this.cout) {
            if (c.name == name) {
                return c;
            }
        }
        return undefined;
    };

    getVente = function (name) {
        for (const v of this.vente) {
            if (v.name == name) {
                return v;
            }
        }
        return undefined;
    };

    coutTotal = function () {
        let total = 0;
        for (const cout of this.cout) {
            total += cout.value();
        }
        return total;
    };

    coutReduce = function (value) {
        let best = this.getCout("Or");
        for (const cout of this.cout) {
            if (cout.value() > best.value()) {
                best = cout;
            }
        }
        best.base--;
        value--;

        if (value > 0) {
            this.coutReduce(value);
        }
    };

    venteTotal = function () {
        let total = 0;
        for (const vente of this.vente) {
            total += vente.value();
        }
        return total;
    };

    remove = function () {
        if (this.isUnit() && this.zone.name == "Terrain") {
            this.owner.ressource("Mana").max -= this.stat("Magie").value();
        }

        this.removeEffect(this.zone.name);

        this.zone.cards.splice(this.slot, 1);
        for (let i = this.slot; i < this.zone.cards.length; i++) {
            this.zone.cards[i].slot--;
        }
        this.zone = undefined;
        this.slot = undefined;
    };

    removeEffect = function () {

    };

    add = function (zone, entity = this.owner) {
        this.owner = entity;
        this.zone = entity.zone(zone);
        this.slot = entity.zone(zone).cards.length;

        if (zone == "Défausse") {
            this.stat("Perpétuité").current = 2;
        }
        else {
            this.stat("Perpétuité").current = 0;
        }

        if (!["Main", "Boutique"].includes(zone)) {
            this.cache = false;
        }

        if (this.isUnit() && zone == "Terrain") {
            entity.ressource("Mana").current += this.stat("Magie").value();
            entity.ressource("Mana").max += this.stat("Magie").value();
        }

        this.addEffect(zone);

        entity.zone(zone).cards.push(this);
    };

    addEffect = function () {

    };

    move = function (zone, entity = this.owner) {
        this.remove();
        this.add(zone, entity);
    };

    up = function () {
        let temp = this.zone.cards[this.slot - 1];

        this.zone.cards[this.slot - 1] = this;
        this.zone.cards[this.slot] = temp;

        temp.slot++;
        this.slot--;
    };

    down = function () {
        let temp = this.zone.cards[this.slot + 1];

        this.zone.cards[this.slot + 1] = this;
        this.zone.cards[this.slot] = temp;

        temp.slot--;
        this.slot++;
    };

    canBuy = function () {
        for (const c of this.cout) {
            if (c.value() > this.owner.ressource(c.name).total()) {
                return false;
            }
        }
        return true;
    };

    buy = function () {
        if (this.canBuy()) {
            for (const c of this.cout) {
                this.owner.ressource(c.name).spend(c.value());
            }
            this.verrou = false;
            this.move("Main");
            this.System.pages.change("Game");
        }
    };

    lock = function (state) {
        this.verrou = state;
    };

    sell = function () {
        for (const v of this.vente) {
            this.owner.ressource(v.name).current += v.value();
        }
        this.remove();
        this.System.pages.change("Game");
    };

    use = function () {
        this.useEffect();
    };

    useEffect = function () {
        this.move("Défausse");
        this.pose();
    };

    pose = function () {
        this.cache = false;

        for (const entity of [this.System.game.player, this.System.game.bot]) {
            for (const zone of entity.zones) {
                let cpy = this.System.copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherPoseEffect(this);
                        if (card.type == "Créature") {
                            for (const e of card.equipments) {
                                e.otherPoseEffect(this);
                            }
                        }
                    }
                }
            }
        }

        this.System.pages.change("Game");
    };

    otherPoseEffect = function () {

    };

    detroy = function () {
        if (!this.trait("Légendaire")) {
            this.move("Défausse");
        }
    };

    otherDieEffect = function () {

    };

    startStepEffect = function () {

    };

    turnEffect = function () {

    };

    text = undefined;

    description = function () {
        return "...";
    };

    stat = function (name) {
        for (const s of this.stats) {
            if (name == s.name) {
                return s;
            }
        }
    };

    addStat = function (name, value) {
        this.stats.push(new Stat(name, value, this));
    };

    hasStat = function () {
        for (const s of this.stats) {
            if (s.value() > 0 || s.current > 0) {
                return true;
            }
        }
        return false;
    };

    trait = function (name) {
        for (const t of this.traits) {
            if (name == t.name) {
                return t;
            }
        }
    };

    addTrait = function (name, value) {
        this.traits.push(new Trait(name, value, this));
    };

    hasTrait = function () {
        for (const t of this.traits) {
            if (t.value()) {
                return true;
            }
        }
        return false;
    };

    isUnit = function () {
        if (this.type == "Créature" || this.type == "Bâtiment") {
            return true;
        }
        return false;
    };

    transform = function (name) {
        let newCard = this.System.cards.getByName(name);
        this.zone.cards[this.slot] = newCard;

        this.zone.cards[this.slot].owner = this.owner;
        this.zone.cards[this.slot].zone = this.zone;
        this.zone.cards[this.slot].slot = this.slot;

        for (const trait of this.traits) {
            newCard.trait(trait.name).add = trait.add;
        }
        for (const stat of this.stats) {
            newCard.stat(stat.name).add = stat.add;
            newCard.stat(stat.name).step = stat.step;
            newCard.stat(stat.name).current = stat.current + newCard.stat(stat.name).base - this.stat(stat.name).base;
        }
        for (const e of this.equipments) {
            newCard.equipments.push(e);
            e.bearer = newCard;
        }
    };
}

class Cout {
    constructor(name, value, card) {
        this.name = name;
        this.card = card;
        this.base = value;
    };

    value = function () {
        let total = this.base;
        return total;
    };
}

export class Stat {
    add = 0;
    step = 0;
    turn = 0;

    constructor(name, value, card) {
        this.name = name;
        this.base = value;
        this.card = card;
    };

    value = function () {
        let total = this.base + this.add + this.step + this.turn;
        if (this.card.type == "Créature") {
            for (const equipment of this.card.equipments) {
                total += equipment.equipStat(this.name).value();
            }
        }

        if (total > 0) {
            return total;
        }
        else {
            return 0;
        }
    };

    increase = function (value) {
        this.add += value;
    };

    fix = function (value) {
        if (this.value() < value) {
            this.add += value - this.value();
        }
    };

    remove = function (value) {
        while (value > 0) {
            if (this.turn > 0) {
                this.turn--;
            }
            else if (this.step > 0) {
                this.step--;
            }
            else {
                this.add--;
            }
            value--;
        }
    };
}

export class Trait {
    add = false;
    step = false;
    turn = false;

    constructor(name, value, card) {
        this.name = name;
        this.base = value;
        this.card = card;
    };

    value = function () {
        let total = this.base + this.add + this.step + this.turn;
        if (this.card.type == "Créature") {
            for (const equipment of this.card.equipments) {
                total += equipment.equipStat(this.name).value();
            }
        }
        return total;
    };
}