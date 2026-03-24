import type { System } from '$lib/system/class';
import { Building } from '$lib/cards/class/building';

export class NavetteSpatiale extends Building {
    name = "Navette spatiale";

    constructor(system: System) {
        super(system);

        this.init([["Or", 50]]);

        this.initFamily(["Astronef"]);

        this.stat("Constitution").init(40);

        this.addText(`Quand posé ou quand se prépare sur le terrain : Stocke 1 flux.`);
    };

    useEffect = () => {
        this.owner().ressource("Flux").stock(1);

        this.move("Terrain");
        this.pose();
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().ressource("Flux").stock(1);
        }
    };
};