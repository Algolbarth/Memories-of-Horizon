import { Stat, Trait } from '../Card.js';
import { Objet } from '../Objets/Objet.js';
import Use from './Use.svelte';

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
        this.addEquipStat("Percée", 0);
        this.addEquipStat("Adresse", 0);
        this.addEquipStat("Intensité", 0);

        this.addEquipStat("Garde", 0);
        this.addEquipStat("Perpétuité", 0);
        this.addEquipStat("Esquive", 0);
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            let target = undefined;

            for (const card of this.owner.zone("Terrain").cards) {
                if (target == undefined && card.type == "Créature" && card.canEquip()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.equip(this);
        this.pose();
    };

    remove = function () {
        if (this.bearer != undefined) {
            for (let i = 0; i < this.bearer.equipments.length; i++) {
                if (this.bearer.equipments[i] == this) {
                    this.bearer.equipments.splice(i, 1);
                    i--;
                }
            }
            this.bearer = undefined;
        }
        else {
            this.zone.cards.splice(this.slot, 1);
            for (let i = this.slot; i < this.zone.cards.length; i++) {
                this.zone.cards[i].slot--;
            }
        }
        this.zone = undefined;
        this.slot = undefined;
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

    fightEffect = function () {

    };

    killEffect = function () {

    };

    defendEffect = function () {

    };
}