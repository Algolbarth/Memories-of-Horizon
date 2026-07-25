import type { System } from "$lib/system/class";
import { writeTextFile, BaseDirectory, mkdir } from '@tauri-apps/plugin-fs';

export async function save(system: System) {
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

        const now = new Date();
        const date = now.toISOString().replace('T', '_').slice(0, 19).replace(/:/g, '-');
        let filename: string = 'MoH_' + system.account.name + "_" + date + ".txt";

        const folder = 'Memories of Horizon/Saves';

        await mkdir(folder, {
            baseDir: BaseDirectory.LocalData,
            recursive: true
        });

        await writeTextFile(`${folder}/${filename}`, text, {
            baseDir: BaseDirectory.LocalData
        });
    }
};