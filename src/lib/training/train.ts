import { Deck } from "$lib/deck/class";
import type { System } from "$lib/system/class";

export class Train {
    player: TrainEntity;
    bot: TrainEntity;
    add = new Train_Add();

    constructor(system: System) {
        let deck = system.train_deck;

        this.player = this.entity(deck);
        this.player.gold = 200;
        this.player.flux = 200;

        this.bot = this.entity(deck);
    };

    entity = (deck: Deck) => {
        return new TrainEntity(deck);
    };
};

class Train_Add {
    is_bot: boolean = false;
    zone: TrainZone | undefined = undefined;
    entity: TrainEntity | undefined = undefined;

    reset = () => {
        this.is_bot = false;
        this.zone = undefined;
        this.entity = undefined;
    };
};

export class TrainEntity {
    deck: Deck;
    life: number = 100;
    gold: number = 0;
    flux: number = 0;
    mana: number = 0;
    zones: TrainZone[] = [
        new TrainZone("Région", 3, undefined, ["Plaine"]),
        new TrainZone("Pile", 10, 1),
        new TrainZone("Inventaire", 10),
        new TrainZone("Terrain", 10),
        new TrainZone("Défausse"),
    ];

    constructor(deck: Deck) {
        this.deck = deck;
    };
};

export class TrainZone {
    name: string;
    cards: string[] = [];
    level: number | undefined;
    size: number | undefined;

    constructor(name: string, size: (number | undefined) = undefined, level: (number | undefined) = undefined, cards: string[] = []) {
        this.name = name;
        this.size = size;
        this.level = level;
        this.cards = cards;
    };
};