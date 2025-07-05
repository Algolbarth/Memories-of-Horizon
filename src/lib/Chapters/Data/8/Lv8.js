import { Chapter } from '../../Chapter.js';

export class Lv8_Geant extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 360);

        this.addStep(80, "Ville", ["Géant", "Plastron en platine", "Géant", "Épée de platine"], ["Deux géants se battent en duel pour départager le plus fort d'entre eux.", "Croyants que vous vouliez interrompre le duel, ils se liguent tous deux contre vous."]);
    }
}

export class Lv8_GoHoumei extends Chapter {
    boss = true;
    level = 8;

    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 150);
        this.addRessource("Terre", 150);

        this.addStep(80, "Montagne", ["Go Houmei, reine des tours"], ["Dans les montagnes du pays de Wei, la plus grande cheffe de guerre est Go Houmei.", "Redoutée pour ses initiatives et son utilisation d'engin de siège, elle n'a jamais été défaite en défense."]);
    }
}