export class Entity {
    life = {
        current: 0,
        max: 0,
        set: function (value) {
            this.current = value;
            this.max = value;
        }
    };
    zones = [new Zone("Lieux", 3),
    new Shop(),
    new Zone("Main", 10),
    new Zone("Terrain", 10),
    new Zone("Défausse")];
    ressources = [];
    place = undefined;

    constructor(System) {
        this.System = System;
        this.setRessources();
    }

    adversary = function () {
        if (this == this.System.game.player) {
            return this.System.game.bot;
        }
        return this.System.game.player;
    };

    setRessources = function () {
        for (const r of this.System.ressources) {
            this.ressources.push({
                name: r,
                current: 0,
                stock: 0,
                total: function () {
                    return this.current + this.stock;
                },
                spend: function (value) {
                    if (value < this.current) {
                        this.current -= value;
                        value = 0;
                    }
                    else {
                        value -= this.current;
                        this.current = 0;
                    }

                    this.stock -= value;
                    if (this.stock < 0) {
                        this.stock = 0;
                    }
                },
                max: 0
            });
        }
    };

    zone = function (name) {
        for (const z of this.zones) {
            if (z.name == name) {
                return z;
            }
        }
    };

    ressource = function (name) {
        for (const z of this.ressources) {
            if (z.name == name) {
                return z;
            }
        }
    };

    getCard = function (name) {
        let card = this.System.cards.getByName(name);
        card.owner = this;
        if (this == this.System.game.player) {
            card.cache = false;
        }
        else {
            card.cache = true;
        }
        return card;
    };

    cardList = function (condition = undefined, drawer) {
        let nameList = [];
        if (this.System.game.deck == undefined) {
            for (const card of this.System.cards.instance) {
                if (this.place.condition(card) && card.level <= this.zone("Boutique").level && (condition == undefined || condition(card, drawer))) {
                    nameList.push(card.name);
                }
            }
        }
        else {
            for (const c of this.System.game.deck.cards) {
                let card = this.System.cards.getByName(c);
                if (this.place.condition(card) && card.level <= this.zone("Boutique").level) {
                    nameList.push(c);
                }
            }
        }
        return nameList;
    };

    draw = function (number, condition, drawer, array = []) {
        let nameList = this.cardList(condition, drawer);
        let card = undefined;

        if (nameList.length > 0) {
            card = this.getCard(nameList[parseInt(Math.random() * nameList.length)]);
            card.add("Boutique");
        }

        array.push(card);

        if (number > 1) {
            array = this.draw(number - 1, condition, drawer, array);
        }
        return array;
    };

    discover = function (number, condition, drawer, array = []) {
        let nameList = this.cardList(condition, drawer);
        let card = undefined;

        for (const card of this.zone("Boutique").cards) {
            if (nameList.includes(card.name)) {
                nameList.splice(nameList.indexOf(card.name), 1);
            }
        }

        if (nameList.length > 0) {
            card = this.getCard(nameList[parseInt(Math.random() * nameList.length)]);
            card.add("Boutique");
        }

        array.push(card);

        if (number > 1) {
            array = this.discover(number - 1, condition, drawer, array);
        }
        return array
    };

    upShop = function () {
        if (this.ressource("Or").total() >= this.zone("Boutique").level * 10) {
            this.ressource("Or").spend(this.zone("Boutique").level * 10);
            this.zone("Boutique").level++;
            this.refreshShop();
            this.System.pages.change("Game");
        }
    };

    actualiseShop = function () {
        if (this.ressource("Or").total() >= 10) {
            this.ressource("Or").spend(10);
            this.refreshShop();
            this.System.pages.change("Game");
        }
    };

    refreshShop = function () {
        let boutique = this.System.copy(this.zone("Boutique").cards);
        for (const card of boutique) {
            if (!card.verrou) {
                card.remove();
            }
        }
        if (this.zone("Boutique").cards.length < 5) {
            this.draw(5 - this.zone("Boutique").cards.length);
        }
    };

    lock = function () {
        let check = false;
        for (const card of this.zone("Boutique").cards) {
            if (!card.verrou) {
                check = true;
            }
        }

        if (check) {
            for (const card of this.zone("Boutique").cards) {
                card.lock(true);
            }
        }
        else {
            for (const card of this.zone("Boutique").cards) {
                card.lock(false);
            }
        }
        this.System.pages.change("Game");
    };

    play = function () {
        let playable = true;
        while (playable) {
            playable = false;
            let main = this.System.copy(this.zone("Main").cards);
            for (const card of main) {
                card.use();
                if (card.zone == undefined || card.zone.name != "Main") {
                    playable = true;
                }
            }
        }

        let boutique = this.System.copy(this.zone("Boutique").cards);
        for (const card of boutique) {
            card.buy();
        }

        for (const ressource of this.ressources) {
            ressource.current = ressource.max;
        }

        if (this.System.game.mode != "Entraînement") {
            if (this.step < this.System.game.chapter.steps.length) {
                for (const name of this.System.game.chapter.steps[this.step].cards) {
                    let card = this.getCard(name, this);
                    card.add("Boutique");
                }
            }
            this.step++;
        }
    };

    checkPerpetuite = function () {
        let defausse = this.System.copy(this.zone("Défausse").cards);
        for (const card of defausse) {
            if (card.stat("Perpétuité").current == 1) {
                card.remove();
            }
            else {
                card.stat("Perpétuité").current--;
            }
        }
    };

    totalIntelligence = function () {
        let total = 0;
        for (const card of this.zone("Terrain").cards) {
            total += card.stat("Intelligence").value();
        }
        return total;
    };
}

class Zone {
    cards = [];

    constructor(name, size = undefined) {
        this.name = name;
        this.size = size;
    };

    isFull = function () {
        return this.cards.length == this.size;
    };
}

class Shop extends Zone {
    level = 1;

    constructor() {
        super("Boutique", 10);
    };
}