import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Satellite extends Building {
    name = "Satellite";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Astronef"]);

        this.stat("Constitution").init(1);
        this.addStat("Puissance", 1);

        this.addText(`Quand arrive sur le terrain : Augmente d'autant sa constitution et sa puissance que de flux possédé.`);
        this.addText(`Au début d'une manche : Inflige autant de dégâts à l'unité sur le terrain adverse en première position que sa puissance.`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain") {
            this.stat('Constitution').increase(this.owner().ressource("Flux").total());
            this.stat('Puissance').increase(this.owner().ressource("Flux").total());
        }
    };

    roundEffect = () => {
        if (this.isArea("Terrain")) {
            this.adversary().zone("Terrain").cards[0].damageByEffect(this.stat("Puissance").value());
        }
    };
};