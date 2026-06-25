import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MasseDeFer extends Equipment {
    name = "Masse de fer";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(5);
        this.equipStat("Constitution").init(5);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Augmente de 5 la constitution et la force du porteur.`);
    };

    attackEffect = () => {
        this.bearer.stat("Constitution").increase(5);
        this.bearer.stat("Force").increase(5);
    };
};