import { Stat, Trait } from '../Card.js';
import { Objet } from '../Objets/Objet.js';

export class Equipment extends Objet {
    equipTraits = [];
    equipStats = [];
    bearer = undefined;

    constructor(System) {
        super(System);

        this.familles.base.push("Équipement");

        this.addEquipTrait("Légendaire", false);
        this.addEquipTrait("Rare", false);

        this.addEquipStat("Attaque", 0);
        this.addEquipStat("Vie", 0);
        this.addEquipStat("Défense", 0);
        this.addEquipStat("Actions", 0);
        this.addEquipStat("Multicoup", 0);
        this.addEquipStat("Vitesse", 0);
        this.addEquipStat("Protection", 0);
        this.addEquipStat("Maniement", 0);
        this.addEquipStat("Magie", 0);
        this.addEquipStat("Intelligence", 0);
        this.addEquipStat("Adresse", 0);
        this.addEquipStat("Intensité", 0);

        this.addEquipStat("Endurance", 0);
        this.addEquipStat("Perpétuité", 0);
        this.addEquipStat("Esquive", 0);
    };

    remove = function () {
        this.zone.cards.splice(this.slot, 1);
        for (let i = this.slot; i < this.zone.cards.length; i++) {
            this.zone.cards[i].slot--;
        }
        this.zone = undefined;
        this.slot = undefined;
        this.bearer = undefined;
    };

    equipStat = function (name) {
        for (const stat of this.equipStats) {
            if (stat.name == name) {
                return stat;
            }
        }
    };

    addEquipStat = function (name, value) {
        let stat = new Stat(name, value, this);
        stat.value = function () {
            return this.base;
        };
        this.equipStats.push(stat);
    };

    equipTrait = function (name) {
        for (const trait of this.equipTraits) {
            if (trait.name == name) {
                return trait;
            }
        }
    };

    addEquipTrait = function (name, value) {
        let trait = new Trait(name, value, this);
        trait.value = function () {
            return this.base;
        };
        this.equipStats.push(trait);
    };

    killEffect = function () {

    };
}