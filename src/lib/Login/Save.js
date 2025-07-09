export function save(System) {
    let text = "MoH_" + System.account.name + "_";
    text +=
        System.account.aventure.victory +
        "_" +
        System.account.aventure.defeat +
        "_" +
        System.account.construct.victory +
        "_" +
        System.account.construct.defeat +
        "_";

    text += System.music.volume + "_";
    text += System.settings.show_intelligence + "_";
    text += System.settings.autoplay + "_";
    text += System.settings.auto_speed + "_";

    text += System.decks.length + "_";
    for (const deck of System.decks) {
        text +=
            deck.name +
            "_" +
            deck.victory +
            "_" +
            deck.defeat +
            "_" +
            deck.cards.length +
            "_";
        for (const card of deck.cards) {
            text += card + "_";
        }
    }

    var element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text),
    );
    element.setAttribute("download", "MoH_" + System.account.name);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}