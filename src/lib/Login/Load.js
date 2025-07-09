import { Account } from "./Account.js";
import { Deck } from "../Decks/Deck.js";

let step;
let save;

export async function load(files, System) {
    if (files != undefined) {
        save = await files[0].text();
        step = 0;

        if (readValue() != "MoH") {
            console.log("Ce fichier n'est pas une sauvegarde pour MoH");
            return undefined;
        }

        System.account = new Account(System, readValue());
        System.account.aventure.victory = readInt();
        System.account.aventure.defeat = readInt();
        System.account.construct.victory = readInt();
        System.account.construct.defeat = readInt();
        System.music.volume = readInt();
        System.settings.show_intelligence = readBool();
        System.settings.autoplay = readBool();
        System.settings.auto_speed = readInt();

        let number_decks = readInt();
        for (let i = 0; i < number_decks; i++) {
            let deck = new Deck(System);
            deck.changeName(readValue(), 0);
            deck.victory = readInt();
            deck.defeat = readInt();
            let cards = readInt();
            for (let j = 0; j < cards; j++) {
                let name = readValue();
                if (System.cards.getByName(name) != undefined) {
                    deck.add(name);
                }
            }
            System.decks.push(deck);
        }

        System.page = "Menu";

        return System;
    }
}

function readValue() {
    let value = '';
    while (save[step] != '_' && step < save.length) {
        value += save[step];
        step++;
    }
    step++;

    if (value != 'undefined') {
        return value;
    } else {
        return undefined;
    }
}

function readInt() {
    let value = readValue();
    if (value != undefined) {
        return parseInt(value);
    } else {
        return undefined;
    }
}

function readBool() {
    let value = readValue();
    if (value == 'true') {
        return true;
    } else if (value == 'false') {
        return false;
    }
}