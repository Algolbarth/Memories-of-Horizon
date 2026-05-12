import { StandardDeck } from "./standard";

export class ChapterDeck extends StandardDeck {
    isPlayable = () => {
        return false;
    };
};