import type { System } from '$lib/system/class';
import { EquipStat } from './stat';
import { EquipTrait } from './trait';
import { Creature } from './creature';
import { Item } from './item';
import Use from '../utils/equip-use.svelte';

export class Equipment extends Item {
    equipElements: string[] = [];
    equipFamilies: string[] = [];
    equipTraits: EquipTrait[] = [];
    equipStats: EquipStat[] = [];
    bearer: Creature | undefined = undefined;

    constructor(system: System) {
        super(system);

        this.initFamily(["Équipement"]);

        this.addEquipStat("Vitalité", 0);
        this.equipStat("Vitalité").display = function () {
            return false;
        };

        this.addEquipStat("Constitution", 0);
        this.equipStat("Constitution").increase = function (value: number) {
            this.add += value;
            this.card.equipStat("Vitalité").increase(value);
        };
        this.equipStat("Constitution").decrease = function (value: number) {
            this.add -= value;
            this.card.equipStat("Vitalité").decrease(value);
        };
        this.equipStat("Constitution").init = function (value: number) {
            this.base = value;
            this.card.equipStat("Vitalité").init(value);
        };

        this.addEquipStat("Régénération", 0);
        this.addEquipStat("Endurance", 0);
        this.addEquipStat("Résistance", 0);
        this.addEquipStat("Épine", 0);
        this.addEquipStat("Maîtrise", 0);
        this.addEquipStat("Vitesse", 0);
        this.addEquipStat("Protection", 0);
        this.addEquipStat("Magie", 0);
        this.addEquipStat("Intelligence", 0);
        this.addEquipStat("Force", 0);
        this.addEquipStat("Agilité", 0);
        this.addEquipStat("Maniement", 0);
        this.addEquipStat("Percée", 0);
        this.addEquipStat("Pénétration", 0);
        this.addEquipStat("Adresse", 0);
        this.addEquipStat("Intensité", 0);

        this.addEquipStat("Santé", 0);
        this.addEquipStat("Initiative", 0);
        this.addEquipStat("Garde", 0);
        this.addEquipStat("Persistance", 0);
        this.addEquipStat("Esquive", 0);
        this.addEquipStat("Critique", 0);
        this.addEquipStat("Étourdissement", 0);
        this.addEquipStat("Poison", 0);
        this.addEquipStat("Toxicité", 0);

        this.addEquipTrait("Commune", false);
        this.addEquipTrait("Rare", false);
        this.addEquipTrait("Légendaire", false);
    };

    canUse = () => {
        for (const card of this.owner().zone("Terrain").cards) {
            if (card instanceof Creature && card.canEquip()) {
                return true;
            }
        }
        return false;
    };

    select = () => {
        if (this.owner().is_player) {
            this.system.game.use.set(this, Use);
        }
        else {
            let target = undefined;

            for (const card of this.owner().zone("Terrain").cards) {
                if (target == undefined && card instanceof Creature && card.canEquip()) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect: Function = (target: Creature) => {
        this.targeting(target);

        target.equip(this);

        if (this.equipStat("Constitution").value() > 0) {
            target.stat("Santé").increase(this.equipStat("Constitution").value());
        }
        if (this.equipStat("Maîtrise").value() > 0) {
            target.stat("Initiative").increase(this.equipStat("Maîtrise").value());
        }

        this.pose();
    };

    remove = () => {
        if (this.bearer != undefined) {
            this.owner().ressource("Mana").decrease(this.equipStat("Magie").value());

            for (let i = 0; i < this.bearer.equipments.length; i++) {
                if (this.bearer.equipments[i] == this) {
                    this.bearer.equipments.splice(i, 1);
                    i--;
                }
            }

            this.bearer = undefined;
        }
        else if (this.entity != undefined && this.zone != undefined && this.slot != undefined) {
            this.zone.cards.splice(this.slot, 1);
            for (let i = this.slot; i < this.zone.cards.length; i++) {
                let card = this.zone.cards[i];
                if (card.slot != undefined) {
                    card.slot--;
                }
            }
        }
        this.zone = undefined;
        this.slot = undefined;
    };

    equipStat = (name: string) => {
        for (const stat of this.equipStats) {
            if (stat.name == name) {
                return stat;
            }
        }
        return new EquipStat(name, 0, 0, this);
    };

    addEquipStat = (name: string, value: number) => {
        let stat: EquipStat = new EquipStat(name, value, 0, this);
        stat.value = function () {
            return this.base + this.add;
        };
        this.equipStats.push(stat);
    };

    displayEquipStat = () => {
        for (const stat of this.equipStats) {
            if (stat.display()) {
                return true;
            }
        }
        return false;
    };

    equipTrait = (name: string) => {
        for (const trait of this.equipTraits) {
            if (trait.name == name) {
                return trait;
            }
        }
        return new EquipTrait(name, false, this);
    };

    addEquipTrait = (name: string, value: boolean) => {
        let trait: EquipTrait = new EquipTrait(name, value, this);
        trait.value = function () {
            return this.base;
        };
        this.equipTraits.push(trait);
    };

    displayEquipTrait = () => {
        for (const trait of this.equipTraits) {
            if (trait.display()) {
                return true;
            }
        }
        return false;
    };

    millBearerEffect: Function | undefined;

    destroyBearerEffect: Function | undefined;

    dieBearerEffect: Function | undefined;

    perishBearerEffect: Function | undefined;

    playEffect: Function | undefined;

    fightEffect: Function | undefined;

    killEffect: Function | undefined;

    defendEffect: Function | undefined;
};