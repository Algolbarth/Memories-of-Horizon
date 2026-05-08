import { Account } from "./account";
import { Deck } from "$lib/deck/class";
import type { System } from "$lib/system/class";

let step: number;
let save: string;

export async function load(files: FileList, system: System) {
    if (files != undefined) {
        save = await files[0].text();
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

        let standard_decks: number = readInt();
        for (let i = 0; i < standard_decks; i++) {
            let deck = system.standard_decks[i];

            deck.victory = readInt();
            deck.defeat = readInt();
        }

        let wild_decks: number = readInt();
        for (let i = 0; i < wild_decks; i++) {
            let deck = new Deck(system);

            deck.changeName(readValue(), 0);

            deck.victory = readInt();
            deck.defeat = readInt();

            let cards = readInt();
            for (let j = 0; j < cards; j++) {
                let name = readValue();
                if (system.cards.getByName(name) != undefined) {
                    deck.add(name);
                }
            }

            system.wild_decks.push(deck);
        }

        system.page = "Menu";

        return system;
    }
};

function readValue() {
    let value = '';
    while (save[step] != '_' && step < save.length) {
        value += save[step];
        step++;
    }
    step++;

    return value;
};

function readInt() {
    let value = readValue();
    if (value != undefined) {
        return parseInt(value);
    } else {
        return 0;
    }
};

function readBool() {
    let value = readValue();
    if (value == 'true') {
        return true;
    } else if (value == 'false') {
        return false;
    }
    else {
        return true;
    }
};