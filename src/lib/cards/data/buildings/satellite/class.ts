import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class Satellite extends Building {
    name = "Satellite";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Astronef"]);

        this.stat("Constitution").init(1);
        this.stat("Portée").init(1);

        this.addText(`Quand arrive sur le terrain : Augmente d'autant sa constitution et sa portée que votre flux.`);
    };

    addEffect = (zone: string) => {
        if (zone == "Terrain") {
            this.stat('Constitution').set(this.owner().ressource("Flux").total());
            this.stat('Portée').set(this.owner().ressource("Flux").total());
        }
    };
};