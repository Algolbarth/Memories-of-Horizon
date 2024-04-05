import { Chapter } from '../Chapter.js';

export class Lv3_Geant extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 60);

        this.addStep(30, "Plaine", ["Géant"], ["Un géant manque de vous marcher dessus.", "Il serait bon ton de lui apprendre à faire attention."]);
    }
}