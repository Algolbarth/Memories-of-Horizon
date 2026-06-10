import type { Card } from "$lib/cards/class/card";
import { Creature } from "$lib/cards/class/creature";
import type { Location } from "$lib/cards/class/location";
import { Deck } from "$lib/deck/class";
import type { System } from "$lib/system/class";
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

        this.deck = new Deck(system, "chapter");

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
        let name_list: string[] = [];

        for (const c of this.deck.cards) {
            let card: Card = this.system.cards.getByName(c);

            let limited: boolean = false;
            if (card.trait("Limité").value()) {
                for (const zone of this.zones) {
                    for (const c of zone.cards) {
                        if (c.name == card.name) {
                            limited = true;
                        }

                        if (c instanceof Creature) {
                            for (const e of c.equipments) {
                                if (e.name == card.name) {
                                    limited = true;
                                }
                            }
                        }
                    }
                }
            }

            if ((this.is_bot || (this.place != undefined && this.place.canRead(card))) && card.level <= this.zone("Pile").level() && !limited && (readCondition == undefined || readCondition(card, drawer))) {
                name_list.push(c);
            }
        }

        return name_list;
    };

    read = (name_list: string[]) => {
        let card: Card = this.getCard(name_list[Math.floor(Math.random() * name_list.length)]);

        card.add("Pile");

        this.nb_cards_read_turn++;

        for (const entity of [this, this.adversary()]) {
            for (const zone of entity.zones) {
                for (const c of zone.cards) {
                    if (c.readCardEffect != undefined) {
                        c.readCardEffect(card);
                    }
                }
            }
        }

        return card;
    };

    draw = (number: number, readCondition: (Function | undefined) = undefined, drawer: (Card | undefined) = undefined, array: Card[] = []) => {
        let name_list: string[] = this.cardList(readCondition, drawer);

        if (name_list.length > 0) {
            let card = this.read(name_list);

            for (const entity of [this, this.adversary()]) {
                for (const zone of entity.zones) {
                    for (const c of zone.cards) {
                        if (c.drawCardEffect != undefined) {
                            c.drawCardEffect(card);
                        }
                    }
                }
            }

            array.push(card);
        }

        if (number > 1) {
            array = this.draw(number - 1, readCondition, drawer, array);
        }
        return array;
    };

    discover = (number: number, readCondition: (Function | undefined) = undefined, drawer: (Card | undefined) = undefined, array: Card[] = []) => {
        let name_list: string[] = this.cardList(readCondition, drawer);

        for (const card of this.zone("Pile").cards) {
            if (name_list.includes(card.name)) {
                name_list.splice(name_list.indexOf(card.name), 1);
            }
        }

        if (name_list.length > 0) {
            let card = this.read(name_list);

            for (const entity of [this, this.adversary()]) {
                for (const zone of entity.zones) {
                    for (const c of zone.cards) {
                        if (c.discoverCardEffect != undefined) {
                            c.discoverCardEffect(card);
                        }
                    }
                }
            }

            array.push(card);
        }

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
        let stack: Card[] = copy(this.zone("Pile").cards);
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
                let cards: Card[] = copy(zone.cards);
                for (const card of cards) {

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

        let stack: Card[] = copy(this.zone("Pile").cards);
        for (const card of stack) {
            card.buy();
        }

        for (const ressource of this.ressources) {
            ressource.current = ressource.production;
        }

        this.refreshStack();
    };

    checkPerpetuite = () => {
        let discard: Card[] = copy(this.zone("Défausse").cards);
        for (const card of discard) {
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
            let cards: Card[] = copy(zone.cards);
            for (const card of cards) {

                if (card.stat("Perception").value() > 0) {
                    card.costReduce(card.stat("Perception").value());
                }

                if (card.startPhaseEffect != undefined) {
                    card.startPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const equipment of card.equipments) {
                        if (equipment.startPhaseEffect != undefined) {
                            equipment.startPhaseEffect();
                        }
                    }
                }
            }
        }
        for (const zone of this.opponent.zones) {
            let cards: Card[] = copy(zone.cards);
            for (const card of cards) {

                if (card.startAdversaryPhaseEffect != undefined) {
                    card.startAdversaryPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const equipment of card.equipments) {
                        if (equipment.startAdversaryPhaseEffect != undefined) {
                            equipment.startAdversaryPhaseEffect();
                        }
                    }
                }
            }
        }
    };

    endPhase = () => {
        for (const zone of this.zones) {
            let cards: Card[] = copy(zone.cards);
            for (const card of cards) {

                if (card.endPhaseEffect != undefined) {
                    card.endPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const equipment of card.equipments) {
                        if (equipment.endPhaseEffect != undefined) {
                            equipment.endPhaseEffect();
                        }
                    }
                }
            }
        }
        for (const zone of this.opponent.zones) {
            let cards: Card[] = copy(zone.cards);
            for (const card of cards) {

                if (card.endAdversaryPhaseEffect != undefined) {
                    card.endAdversaryPhaseEffect();
                }

                if (card instanceof Creature) {
                    for (const equipment of card.equipments) {
                        if (equipment.endAdversaryPhaseEffect != undefined) {
                            equipment.endAdversaryPhaseEffect();
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