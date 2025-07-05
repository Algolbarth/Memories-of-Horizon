import { Chapter } from '../../Chapter.js';

export class Lv4_Chevalier extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 100);

        this.addStep(40, "Plaine", ["Chevalier (monté)", "Chevalier (monté)"], ["Une troupe de chevalier errant terrorise la région en usant de leur privilège pour vivre aux dépends des habitants."]);
        this.addStep(40, "Plaine", ["Chevalier (monté)", "Chevalier (monté)"]);
    }
}

export class Lv4_Kanki extends Chapter {
    boss = true;
    level = 4;

    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 100);

        this.addStep(40, "Plaine", ["Kanki, roi des bandits"]);
    }
}