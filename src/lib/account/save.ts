import type { System } from "$lib/system/class";

export function save(system: System) {
    if (system.account) {
        let text = "MoH_";

        text += system.account.name + "_";
        text += system.account.play_time + "_";
        if (system.account.session_time > system.account.best_session_time) {
            text += system.account.session_time + "_";
        }
        else {
            text += system.account.best_session_time + "_";
        }
        text += system.account.ingame_time + "_";

        text += system.account.standard.victory + "_";
        text += system.account.standard.defeat + "_";
        text += system.account.wild.victory + "_";
        text += system.account.wild.defeat + "_";

        text += system.music.volume + "_";
        text += system.settings.show_intelligence + "_";
        text += system.settings.autoplay + "_";
        text += system.settings.auto_speed + "_";
        text += system.settings.show_card_description + "_";

        text += system.standard_decks.length + "_";
        for (const deck of system.standard_decks) {
            text += deck.victory + "_" + deck.defeat + "_";
        }

        text += system.wild_decks.length + "_";
        for (const deck of system.wild_decks) {
            text += deck.name + "_" + deck.victory + "_" + deck.defeat + "_" + deck.cards.length + "_";
            for (const card of deck.cards) {
                text += card + "_";
            }
        }

        var element = document.createElement("a");
        element.setAttribute(
            "href",
            "data:text/plain;charset=utf-8," + encodeURIComponent(text),
        );
        element.setAttribute("download", "MoH_" + system.account.name);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
};