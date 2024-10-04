import { Chapter } from '../Game/Chapter.js';

export class Lv5_ChevalierGeant extends Chapter {
    constructor(System, number) {
        super(System, number);

        this.addRessource("Or", 150);

        this.addStep(50, "Plaine", ["Chevalier géant"], ["Un chevalier sur de lui souhaite vous défier pour prouver sa force.", "Le problème étant que ce chevalier semble pouvoir enjamber des montagnes."]);
    }
}