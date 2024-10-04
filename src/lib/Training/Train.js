export class Train {
    deck = undefined;
    add = {
        entity: undefined,
        zone: undefined,
        reset: function () {
            this.zone = undefined;
        },
    };

    constructor() {
        this.player = this.entity();
        this.player.gold = 200;
        this.player.flux = 200;

        this.bot = this.entity();
    };

    entity = function () {
        return {
            life: 100,
            gold : 0,
            flux : 0,
            zones: [
                {
                    name: "Lieux",
                    cards: ["Plaine"],
                },
                {
                    name: "Boutique",
                    cards: [],
                    level: 1,
                },
                {
                    name: "Main",
                    cards: [],
                },
                {
                    name: "Terrain",
                    cards: [],
                },
                {
                    name: "Défausse",
                    cards: [],
                },
            ],
        };
    };
}