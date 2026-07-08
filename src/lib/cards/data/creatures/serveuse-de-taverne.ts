import type { System } from '$lib/system/class';
import { Creature } from '$lib/cards/class/creature';

export class ServeuseDeTaverne extends Creature {
    name = "Serveuse de taverne";

    constructor(system: System) {
        super(system);

        this.init([["Or", 35]]);

        this.initFamily(["Humain"]);

        this.stat("Constitution").init(5);
        this.stat("Force").init(5);

        this.addText(`Quand posé ou quand se prépare sur le terrain : Génère {card:Bière} dans votre inventaire.`);
    };

    useEffect = () => {
        this.owner().getCard("Bière").add("Inventaire");

        this.move("Terrain");
        this.pose();
    };

    startPhaseEffect = () => {
        if (this.isArea("Terrain")) {
            this.owner().getCard("Bière").add("Inventaire");
        }
    };
};