import type { Card } from "../cards/class/class";
import { Creature } from "../cards/class/creature";
import type { Location } from "../cards/class/location";
import { Deck } from "../deck/class";
import type { System } from "../system/class";
import { copy } from "../utils";
import { Stack } from "./stack";
import { Zone } from "./zone";

export class Entity {
    life = {
        current: 0,
        max: 0,
        set: function (value: number) {
            this.current = value;
            this.max = value;
        }
    };
    zones: Zone[] = [
        new Zone("Région", 3),
        new Stack(),
        new Zone("Inventaire", 10),
        new Zone("Terrain", 10),
        new Zone("Défausse")
    ];
    ressources: EntityRessource[] = [];
    place: Location | undefined = undefined;
    system: System;
    deck: Deck;
    is_player: boolean = false;
    is_bot: boolean = true;
    opponent: Entity;
    nb_cards_read_turn: number = 0;

    constructor(system: System, opponent: Entity | undefined = undefined) {
        this.system = system;

        if (opponent == undefined) {
            this.is_player = true;
            this.is_bot = false;
            this.opponent = new Entity(system, this);
        }
        else {
            this.opponent = opponent;
            opponent.opponent = this;
        }

        this.deck = new Deck(system);

        this.setRessources();
    };

    adversary = () => {
        return this.opponent;
    };

    setRessources = () => {
        for (const r of this.system.ressources.list) {
            this.ressources.push(new EntityRessource(r.name));
        }
    };

    zone = (name: string) => {
        for (const z of this.zones) {
            if (z.name == name) {
                return z;
            }
        }
        return new Zone(name);
    };

    ressource = (name: string) => {
        for (const z of this.ressources) {
            if (z.name == name) {
                return z;
            }
        }
        return new EntityRessource(name);
    };

    getCard = (name: string) => {
        let card: Card = this.system.cards.getByName(name);

        card.entity = this;

        if (this.is_player) {
            card.cache = false;
        }
        else {
            card.cache = true;
        }

        return card;
    };

    cardList = (readCondition: (Function | undefined) = undefined, drawer: Card | undefined) => {
        let nameList: string[] = [];

        for (const c of this.deck.cards) {
            let card = this.system.cards.getByName(c);
            if ((this.is_bot || (this.place != undefined && this.place.canRead(card))) && card.level <= this.zone("Pile").level() && (readCondition == undefined || readCondition(card, drawer))) {
                nameList.push(c);
            }
        }

        return nameList;
    };

    read = (nameList: string[], array: Card[]) => {
        if (nameList.length > 0) {
            let card: Card = this.getCard(nameList[Math.floor(Math.random() * nameList.length)]);
            card.add("Pile");
            array.push(card);

            this.nb_cards_read_turn++;
        }

        return array;
    };

    draw = (number: number, readCondition: (Function | undefined) = undefined, drawer: (Card | undefined) = undefined, array: Card[] = []) => {
        let nameList: string[] = this.cardList(readCondition, drawer);

        array = this.read(nameList, array);

        if (number > 1) {
            array = this.draw(number - 1, readCondition, drawer, array);
        }
        return array;
    };

    discover = (number: number, readCondition: (Function | undefined) = undefined, drawer: (Card | undefined) = undefined, array: Card[] = []) => {
        let nameList: string[] = this.cardList(readCondition, drawer);

        for (const card of this.zone("Pile").cards) {
            if (nameList.includes(card.name)) {
                nameList.splice(nameList.indexOf(card.name), 1);
            }
        }

        array = this.read(nameList, array);

        if (number > 1) {
            array = this.discover(number - 1, readCondition, drawer, array);
        }
        return array;
    };

    canUpStack = () => {
        if (this.ressource("Or").total() >= this.zone("Pile").upgrade_cost) {
            return true;
        }
        return false;
    };

    upStack = () => {
        if (this.canUpStack()) {
            this.ressource("Or").spend(this.zone("Pile").upgrade_cost);
            this.zone("Pile").base_level += 1;
            this.zone("Pile").upgrade_cost = this.zone("Pile").base_level * 10;
        }
    };

    canActualiseStack = () => {
        if (this.ressource("Or").total() >= 10) {
            return true;
        }
        return false;
    };

    actualiseStack = () => {
        if (this.canActualiseStack()) {
            this.ressource("Or").spend(10);
            this.refreshStack();
        }
    };

    refreshStack = () => {
        let stack = copy(this.zone("Pile").cards);
        for (const card of stack) {
            if (!card.locked) {
                card.remove();
            }
        }

        if (this.zone("Pile").cards.length < 5) {
            this.draw(5 - this.zone("Pile").cards.length);
        }

        for (const entity of [this, this.opponent]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {

                    if (card.refreshStackEffect != undefined) {
                        card.refreshStackEffect();
                    }

                    if (card instanceof Creature) {
                        for (const e of card.equipments) {
                            if (e.refreshStackEffect != undefined) {
                                e.refreshStackEffect();
                            }
                        }
                    }
                }
            }
        }
    };

    isFullLocked = () => {
        let check = true;

        for (const card of this.zone("Pile").cards) {
            if (!card.locked) {
                check = false;
            }
        }

        if (this.zone("Pile").cards.length == 0) {
            check = false;
        }

        return check;
    };

    lock = () => {
        if (this.isFullLocked()) {
            for (const card of this.zone("Pile").cards) {
                card.unlock();
            }
        }
        else {
            for (const card of this.zone("Pile").cards) {
                card.lock();
            }
        }
    };

    play = () => {
        let continue_to_play: boolean = true;
        while (continue_to_play) {
            continue_to_play = false;

            for (let i = 0; i < this.zone("Inventaire").cards.length; i++) {
                let card = this.zone("Inventaire").cards[i];
                if (card.canUse()) {
                    card.use();

                    if (card.isNotArea("Inventaire")) {
                        i--;
                        continue_to_play = true;
                    }
                }
            }
        }

        let stack = copy(this.zone("Pile").cards);
        for (const card of stack) {
            card.buy();
        }

        for (const ressource of this.ressources) {
            ressource.current = ressource.production;
        }

        this.refreshStack();
    };

    checkPerpetuite = () => {
        let defausse = copy(this.zone("Défausse").cards);
        for (const card of defausse) {
            if (card.stat("Persistance").value() == 1) {
                card.remove();
            }
            else {
                card.stat("Persistance").remove(1);
            }
        }
    };

    totalIntelligence = () => {
        let total = 0;
        for (const card of this.zone("Terrain").cards) {
            total += card.stat("Intelligence").value();
        }
        return total;
    };

    isLoser = () => {
        return this.zone("Terrain").cards.length == 0 || this.life.current <= 0;
    };

    startPhase = () => {
        for (const zone of this.zones) {
            let cpy = copy(zone.cards);
            for (const card of cpy) {

                if (card.startAdversaryPhaseEffect != undefined) {
                    card.startAdversaryPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const e of card.equipments) {
                        if (e.startAdversaryPhaseEffect != undefined) {
                            e.startAdversaryPhaseEffect();
                        }
                    }
                }
            }
        }
        for (const zone of this.opponent.zones) {
            let cpy = copy(zone.cards);
            for (const card of cpy) {

                if (card.startPhaseEffect != undefined) {
                    card.startPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const e of card.equipments) {
                        if (e.startPhaseEffect != undefined) {
                            e.startPhaseEffect();
                        }
                    }
                }
            }
        }
    };

    endPhase = () => {
        for (const zone of this.zones) {
            let cpy = copy(zone.cards);
            for (const card of cpy) {

                if (card.endAdversaryPhaseEffect != undefined) {
                    card.endAdversaryPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const e of card.equipments) {
                        if (e.endAdversaryPhaseEffect != undefined) {
                            e.endAdversaryPhaseEffect();
                        }
                    }
                }
            }
        }
        for (const zone of this.opponent.zones) {
            let cpy = copy(zone.cards);
            for (const card of cpy) {

                if (card.endPhaseEffect != undefined) {
                    card.endPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const e of card.equipments) {
                        if (e.endPhaseEffect != undefined) {
                            e.endPhaseEffect();
                        }
                    }
                }
            }
        }
    };
};

class EntityRessource {
    name: string;
    current: number = 0;
    stockage: number = 0;
    production: number = 0;

    constructor(name: string) {
        this.name = name;
    };

    total = () => {
        return this.current + this.stockage;
    };

    spend = (value: number) => {
        if (value < this.current) {
            this.current -= value;
            value = 0;
        }
        else {
            value -= this.current;
            this.current = 0;
        }

        this.stockage -= value;
        if (this.stockage < 0) {
            this.stockage = 0;
        }
    };

    produce = (value: number) => {
        this.current += value;
    };

    stock = (value: number) => {
        this.stockage += value;
    };

    destock = (value: number) => {
        this.stockage -= value;
        if (this.stockage < 0) {
            this.stockage = 0;
        }
    };

    increase = (value: number) => {
        this.production += value;
    };

    decrease = (value: number) => {
        this.production -= value;
        if (this.production < 0) {
            this.production = 0;
        }
    };
};