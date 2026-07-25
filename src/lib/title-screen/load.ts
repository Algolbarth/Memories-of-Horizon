import { Account } from "../profil/account";
import { Deck } from "$lib/deck/class";
import type { System } from "$lib/system/class";

let step: number;
let save: string;

export async function load(content: string, system: System) {
    save = content;
    step = 0;

    if (readValue() != "MoH") {
        console.log("Ce fichier n'est pas une sauvegarde pour MoH");
        return undefined;
    }

    system.account = new Account(system, readValue());
    system.account.play_time = readInt();
    system.account.best_session_time = readInt();
    system.account.ingame_time = readInt();
    system.account.standard.victory = readInt();
    system.account.standard.defeat = readInt();
    system.account.wild.victory = readInt();
    system.account.wild.defeat = readInt();

    system.music.volume = readInt();
    system.settings.show_intelligence = readBool();
    system.settings.autoplay = readBool();
    system.settings.auto_speed = readInt();
    system.settings.show_card_description = readBool();

    let nb_standard_decks: number = readInt();
    for (let i = 0; i < nb_standard_decks; i++) {
        let deck = system.standard_decks[i];

        deck.victory = readInt();
        deck.defeat = readInt();
    }

    let nb_wild_decks: number = readInt();
    for (let i = 0; i < nb_wild_decks; i++) {
        let deck: Deck = new Deck(system, "wild");

        deck.changeName(readValue(), 0);

        deck.victory = readInt();
        deck.defeat = readInt();

        let nb_cards: number = readInt();
        for (let j = 0; j < nb_cards; j++) {
            let name = readValue();
            if (system.cards.getByName(name) != undefined) {
                deck.add(name);
            }
        }

        system.wild_decks.push(deck);
    }

    return system;
};

function readValue() {
    let value: string = '';
    while (save[step] != '_' && step < save.length) {
        value += save[step];
        step++;
    }
    step++;

    return value;
};

function readInt() {
    let value: string = readValue();
    if (value != undefined) {
        return parseInt(value);
    } else {
        console.log("Ce nombre n'est pas défini correctement");
        return 0;
    }
};

function readBool() {
    let value: string = readValue();
    if (value == 'true') {
        return true;
    } else if (value == 'false') {
        return false;
    }
    else {
        console.log(value + " n'est pas un boolean");
        return false;
    }
};