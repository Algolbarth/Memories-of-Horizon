import { Entity } from './entity';
import { Chapter } from '../chapters/class';
import { copy } from '../utils';
import type { System } from '../system/class';
import type { Card } from '../cards/class/class';
import { Unit } from '../cards/class/unit';
import type { TrainEntity } from '../training/train';
import { Creature } from '../cards/class/creature';
import { Deck } from '../deck/class';

export class Game {
    system: System;
    phase: string = "Préparation";
    player: Entity;
    bot: Entity;
    use: Use = new Use();
    pause: boolean = false;
    mode: string;
    chapter: Chapter | undefined;
    fighter: Unit | undefined = undefined;
    auto: number | undefined;
    round: number = 1;

    constructor(system: System, mode: string, deck: Deck | undefined = undefined) {
        this.system = system;

        this.player = new Entity(this.system, undefined);
        this.bot = new Entity(this.system, this.player);

        this.mode = mode;
        this.system.game = this;

        if (this.mode == "Entraînement") {
            this.trainInit();
        }
        else if (deck != undefined && (this.mode == "Libre" || this.mode == "Standard")) {
            this.player.life.set(100);
            this.player.ressource("Or").production = 5;
            this.player.ressource("Flux").stockage = 5;
            this.player.deck = deck;

            this.player.getCard("Plaine").add("Région");
            this.player.place = this.player.zone("Région").cards[0];

            this.player.getCard("Humain").add("Terrain");

            this.chapter = this.system.chapters.getRandom(1);

            this.startChapter();
        }
    };

    trainInit = () => {
        this.trainInitEntity(this.player, this.system.train.player);
        this.trainInitEntity(this.bot, this.system.train.bot);

        this.system.page = "Game";
    };

    trainInitEntity = (entity: Entity, train_entity: TrainEntity) => {
        entity.life.set(train_entity.life);

        entity.deck = train_entity.deck;

        entity.ressource("Or").production = train_entity.gold;
        entity.ressource("Or").current = train_entity.gold;
        entity.ressource("Flux").stockage = train_entity.flux;
        entity.ressource("Mana").stockage = train_entity.mana;

        entity.zone("Pile").base_level = train_entity.zones[1].level;
        for (const zone of train_entity.zones) {
            entity.zone(zone.name).size = zone.size;
            for (const card_name of zone.cards) {
                entity.getCard(card_name).add(zone.name);
            }
        }

        entity.place = entity.zone("Région").cards[0];
    };

    nextChapter = () => {
        if (this.chapter != undefined && this.chapter.number < 100) {
            let number = this.chapter.number + 1;
            if (number % 10 == 0) {
                this.chapter = this.system.bosses.getRandom(number);
            }
            else {
                this.chapter = this.system.chapters.getRandom(number);
            }

            this.player.ressource("Or").increase(1);
            this.player.ressource("Flux").stock(1);

            this.startChapter();
        }
        else {
            this.victory();
        }
    };

    startChapter = () => {
        this.bot = new Entity(this.system, this.player);

        this.chapter.init();

        this.bot.zone("Pile").base_level = 1 + Math.floor((this.chapter.number - 1) / 5);

        this.startStep();
    };

    startStep = () => {
        let step = this.chapter.step;

        this.bot.life.set(step.life);

        this.bot.deck = step.deck;

        for (const ressource of this.bot.ressources) {
            ressource.current = ressource.production;
        }

        for (const zone of this.bot.zones) {
            if (zone.name == "Région") {
                if (step.locations.length > 3) {
                    zone.size = step.locations.length;
                }
                else {
                    zone.size = 3;
                }
            }
            else if (zone.name != "Défausse") {
                zone.size = step.zone_size;
            }
        }

        this.bot.zone("Région").cards = [];
        for (const location of step.locations) {
            this.bot.getCard(location).add("Région");
        }
        this.bot.place = this.bot.zone("Région").cards[0];

        this.bot.zone("Pile").cards = [];
        for (const name of step.cards) {
            this.bot.getCard(name).add("Pile");
        }

        this.bot.play();

        this.startTurn();
    };

    startTurn = () => {
        for (const ressource of this.player.ressources) {
            ressource.current = ressource.production;
        }

        for (const entity of [this.player, this.bot]) {
            entity.nb_cards_read_turn = 0;
        }

        if (this.mode != "Entraînement") {
            this.player.refreshStack();
        }

        this.botTurn();
    };

    botTurn = () => {
        this.bot.startPhase();

        this.bot.play();

        this.bot.endPhase();

        this.playerTurn();
    };

    playerTurn = () => {
        this.player.startPhase();

        if (this.mode != "Entraînement") {
            this.chapter.startDialog();
        }
        else {
            this.system.page = "Game";
        }
    };

    isBattle = () => {
        if (this.phase == "Combat") {
            return true;
        }
        return false;
    };

    startBattle = () => {
        this.player.endPhase();

        if (this.player.zone("Terrain").cards.length > 0 && this.bot.zone("Terrain").cards.length > 0) {
            this.phase = "Combat";
            this.round = 0;

            for (const entity of [this.player, this.bot]) {
                for (const zone of entity.zones) {
                    let cpy = copy(zone.cards);
                    for (const card of cpy) {

                        if (card.startBattleEffect != undefined) {
                            card.startBattleEffect();
                        }

                        if (card instanceof Creature) {
                            for (const e of card.equipments) {
                                if (e.startBattleEffect != undefined) {
                                    e.startBattleEffect();
                                }
                            }
                        }
                    }
                }
            }

            this.nextRound();

            if (this.system.settings.autoplay) {
                this.startAuto();
            }
        }
        else {
            this.endBattle();
        }
    };

    startAuto = () => {
        if (!this.isEndBattle()) {
            this.auto = setInterval(this.actionBattle.bind(this), this.system.settings.auto_speed);
        }
    };

    stopAuto = () => {
        clearInterval(this.auto);
        this.auto = undefined;
    };

    nextRound = () => {
        this.round++;
        this.fighter = undefined;

        for (const entity of [this.player, this.bot]) {
            for (const zone of entity.zones) {
                let cpy: Card[] = copy(zone.cards);
                for (const card of cpy) {

                    if (card.roundEffect != undefined) {
                        card.roundEffect();
                    }

                    if (card instanceof Unit) {
                        if (card instanceof Creature) {
                            for (const e of card.equipments) {
                                if (e.roundEffect != undefined) {
                                    e.roundEffect();
                                }
                            }
                        }

                        if (card.stat("Régénération").value() > 0) {
                            card.heal(card.stat("Régénération").value());
                        }

                        if (card instanceof Creature) {
                            if (card.stat("Poison").value() > 0) {
                                card.specialDamage(card.stat("Toxicité").value(), card);
                                card.stat("Poison").decrease(1);
                            }
                        }

                        if (card.stat("Brûlure").value() > 0) {
                            card.physicalDamage(card.stat("Brûlure").value(), card);
                        }
                    }
                }
            }
        }
    };

    resetAction = () => {
        for (const entity of [this.player, this.bot]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card.stat("Initiative").value() < card.stat("Maîtrise").value()) {
                    card.stat("Initiative").set(card.stat("Maîtrise").value());
                }
            }
        }
    };

    actionBattle = () => {
        if (!this.isEndBattle()) {
            if (!this.isEndRound()) {
                this.setNextFighter();
                this.fighter.play();
            }
            else if (this.round == 5) {
                this.endRound();
                this.endBattle();
            }
            else {
                this.endRound();
                this.nextRound();
            }
        }
        else {
            this.endRound();
            this.endBattle();
        }
    };

    setNextFighter = (previous_entity: Entity | undefined = undefined) => {
        let entity: Entity = this.choiceEntity(previous_entity);

        let speed = this.getBestSpeed();
        this.fighter = undefined;
        for (let i = 0; i < entity.zone("Terrain").cards.length; i++) {
            let card = entity.zone("Terrain").cards[i];
            if (card instanceof Unit && this.fighter == undefined && (card.type != "Créature" || card.stat("Étourdissement").value() == 0) && card.stat("Initiative").value() > 0 && speed == card.stat("Vitesse").value()) {
                this.fighter = card;
            }
        }

        if (this.fighter == undefined) {
            this.setNextFighter(entity.opponent);
        }
    };

    choiceEntity = (previous_entity: Entity | undefined) => {
        if (previous_entity == undefined) {
            if (this.fighter == undefined) {
                return this.player;
            }
            else {
                return this.fighter.adversary();
            }
        }
        return previous_entity;
    };

    getBestSpeed = () => {
        let best_speed: number = 0;

        for (const entity of [this.player, this.bot]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card.stat("Initiative").value() > 0 && (card.type != "Créature" || card.stat("Étourdissement").value() == 0) && card.stat("Vitesse").value() > best_speed) {
                    best_speed = card.stat("Vitesse").value();
                }
            }
        }

        return best_speed;
    };

    isEndRound = () => {
        for (const entity of [this.player, this.bot]) {
            for (const card of entity.zone("Terrain").cards) {
                if (card.stat("Initiative").value() > 0 && (card.type != "Créature" || card.stat("Étourdissement").value() == 0)) {
                    return false;
                }
            }
        }

        return true;
    };

    endRound = () => {
        this.resetAction();

        for (const entity of [this.player, this.bot]) {
            for (const zone of entity.zones) {
                let cpy = copy(zone.cards);
                for (const card of cpy) {

                    card.elements.round = [];

                    card.families.round = [];

                    for (const stat of card.stats) {
                        stat.round = 0;
                    }

                    for (const trait of card.traits) {
                        trait.round = false;
                    }
                }
            }
        }
    };

    isEndBattle = () => {
        for (const entity of [this.player, this.bot]) {
            if (entity.isLoser()) {
                return true;
            }
        }
        return false;
    };

    isVictory = () => {
        if (this.bot.isLoser()) {
            return true;
        }
        return false;
    };

    endBattle = () => {
        this.phase = "Préparation";
        this.fighter = undefined;
        this.system.view.reset();
        this.stopAuto();

        this.endTurn();
    };

    endTurn = () => {
        this.player.checkPerpetuite();
        this.bot.checkPerpetuite();

        for (const entity of [this.player, this.bot]) {

            entity.zone("Pile").turn_level = 0;

            for (const zone of entity.zones) {
                let cpy: Card[] = copy(zone.cards);
                for (const card of cpy) {

                    card.elements.turn = [];

                    card.families.turn = [];

                    for (const stat of card.stats) {
                        stat.turn = 0;
                    }

                    for (const trait of card.traits) {
                        trait.turn = false;
                    }

                    if (card instanceof Creature && card.stat("Étourdissement").value() > 0) {
                        card.stat("Étourdissement").remove(1);
                    }

                    if (card.stat("Brûlure").value() > 0) {
                        card.stat("Brûlure").set(0);
                    }
                }
            }
        }

        if (this.isVictory()) {
            for (const card of this.player.zone("Terrain").cards) {
                if (card instanceof Creature) {
                    this.bot.life.current -= card.level;
                }
            }

            if (this.bot.life.current <= 0) {
                this.nextTurn();
            }
            else {
                this.startTurn();
            }
        }
        else {
            for (const card of this.bot.zone("Terrain").cards) {
                if (card instanceof Creature) {
                    this.player.life.current -= card.level;
                }
            }

            if (this.player.life.current <= 0) {
                this.defeat();
            }
            else {
                this.startTurn();
            }
        }
    };

    nextTurn = () => {
        if (this.mode == "Entraînement") {
            this.startTurn();
        }
        else {
            if (this.chapter.step_slot + 1 < this.chapter.steps.length) {
                this.nextStep();
            }
            else {
                this.nextChapter();
            }
        }
    };

    nextStep = () => {
        this.chapter.nextStep();
        this.startStep();
    };

    victory = () => {
        if (this.mode == "Standard") {
            this.system.account.standard.victory += 1;
        }
        else if (this.mode == "Libre") {
            this.system.account.wild.victory += 1;
        }

        this.player.deck.victory += 1;

        this.system.page = "Victory";
    };

    defeat = () => {
        if (this.mode == "Standard") {
            this.system.account.standard.defeat += 1;
        }
        else if (this.mode == "Libre") {
            this.system.account.wild.defeat += 1;
        }

        this.player.deck.defeat += 1;

        this.system.page = "GameOver";
    };
};

class Use {
    card: Card | undefined = undefined;
    svelte: __sveltets_2_IsomorphicComponent<{ system: System; game: Game; card: Card; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string> | undefined = undefined;

    set = (card: Card, svelte: __sveltets_2_IsomorphicComponent<{ system: System; game: Game; card: Card; }, { [evt: string]: CustomEvent<any>; }, {}, {}, string>) => {
        this.card = card;
        this.svelte = svelte;
    };

    reset = () => {
        this.card = undefined;
        this.svelte = undefined;
    };
};