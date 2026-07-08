import type { System } from '$lib/system/class';
import { Equipment } from '$lib/cards/class/equipment';

export class MasseDePlatine extends Equipment {
    name = "Masse de platine";

    constructor(system: System) {
        super(system);

        this.init([["Or", 25]]);

        this.initFamily(["Arme"]);

        this.equipStat("Force").init(20);
        this.equipStat("Constitution").init(20);

        this.addText(`Quand posé : S'équipe à une créature sur votre terrain.`);
        this.addText(`Quand le porteur attaque : Augmente de 20 la constitution et la force du porteur.`);
    };

    attackEffect = () => {
        this.bearer.stat("Constitution").increase(20);
        this.bearer.stat("Force").increase(20);
    };
};