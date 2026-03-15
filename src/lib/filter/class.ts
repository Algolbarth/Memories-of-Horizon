import type { Card } from "../cards/class/class";
import type { System } from "../system/class";

export class Filter {
    system: System;

    levels_additive: string[] = ["=", "≠", "<", "<=", ">", "=>"];
    levels: string[] = ["Tous"];
    types: string[] = ["Tous", "Action", "Bâtiment", "Créature", "Objet", "Lieu"];
    families: string[] = [];
    elements: string[] = [];

    select_name: string = "";
    select_effect: string = "";
    level_additive: string = "=";
    select_level: string = "Tous";
    select_type: string = "Tous";
    select_families: string[] = [];
    families_additive: boolean = true;
    select_elements: string[] = [];
    elements_additive: boolean = true;
    select_common: boolean = true;
    select_rare: boolean = false;
    select_legendary: boolean = false;

    constructor(system: System) {
        this.system = system;

        for (let i = 0; i < 20; i++) {
            this.levels.push("" + (i + 1));
        }
    };

    resetSelection() {
        this.select_name = "";
        this.select_effect = "";
        this.select_level = "Tous";
        this.level_additive = "=";
        this.select_type = "Tous";
        this.select_families = [];
        this.families_additive = true;
        this.select_elements = [];

        this.select_common = true;
        this.select_rare = false;
        this.select_legendary = false;
    };

    isReset() {
        if (this.select_name != "" || this.select_effect != "" || this.select_level != "Tous" || this.level_additive != "=" || this.select_type != "Tous" || this.select_families.length > 0 || this.families_additive == false || this.select_elements.length > 0 || this.elements_additive == false || this.select_common == false || this.select_rare == true || this.select_legendary == true) {
            return false;
        }
        return true;
    };

    changeSelection(name: string, effect: string, level: string, level_additive: string, type: string, families: string[], families_additive: boolean, elements: string[], elements_additive: boolean, common: boolean, rare: boolean, legendary: boolean) {
        this.select_name = name;
        this.select_effect = effect;
        this.select_level = level;
        this.level_additive = level_additive;
        this.select_type = type;
        this.select_families = families;
        this.families_additive = families_additive;
        this.select_elements = elements;
        this.elements_additive = elements_additive;

        this.select_common = common;
        this.select_rare = rare;
        this.select_legendary = legendary;
    };

    filterString(names: string[], sort_type: string, condition: Function | undefined = undefined) {
        let cards: Card[] = [];

        for (const name of names) {
            cards.push(this.system.cards.getByName(name));
        }

        cards = this.filterCards(cards, sort_type, condition);

        names = [];
        for (const card of cards) {
            names.push(card.name);
        }

        return names;
    };

    filterCards(cards: Card[], sort_type: string, condition: Function | undefined = undefined) {
        let tab = [];

        for (const card of cards) {
            if (this.filterByName(card) && this.filterByEffect(card) && this.filterByLevel(card) && this.filterByType(card) && this.filterByFamily(card) && this.filterByElement(card) && ((this.select_legendary && card.trait("Légendaire").value()) || (this.select_rare && card.trait("Rare").value()) || (this.select_common && card.trait("Commune").value()) && (condition == undefined || condition(card)))) {
                tab.push(card);
            }
        }

        tab = this.sortCards(tab, sort_type);

        return tab;
    };

    filterByName(card: Card) {
        return (this.select_name == "" || card.name.toLowerCase().includes(this.select_name.toLowerCase()));
    };

    filterByEffect(card: Card) {
        return (this.select_effect == "" || (card.text != undefined && card.text.toLowerCase().includes(this.select_effect.toLowerCase())));
    };

    filterByLevel(card: Card) {
        if (this.select_level == "Tous") {
            return true;
        }

        if (this.level_additive == "=") {
            return card.level == parseInt(this.select_level);
        }
        else if (this.level_additive == "≠") {
            return card.level != parseInt(this.select_level);
        }
        else if (this.level_additive == ">") {
            return card.level > parseInt(this.select_level);
        }
        else if (this.level_additive == "=>") {
            return card.level >= parseInt(this.select_level);
        }
        else if (this.level_additive == "<") {
            return card.level < parseInt(this.select_level);
        }
        else if (this.level_additive == "<=") {
            return card.level <= parseInt(this.select_level);
        }
    };

    filterByType(card: Card) {
        return (this.select_type == "Tous" || card.type == this.select_type);
    };

    filterByFamily(card: Card) {
        if (this.select_families.length == 0) {
            return true;
        }

        if (this.families_additive) {
            for (const family of this.select_families) {
                if (card.isFamily(family)) {
                    return true;
                }
            }
            return false;
        }
        else {
            for (const family of this.select_families) {
                if (!card.isFamily(family)) {
                    return false;
                }
            }
            return true;
        }
    };

    filterByElement(card: Card) {
        if (this.select_elements.length == 0) {
            return true;
        }

        if (this.elements_additive) {
            for (const element of this.select_elements) {
                if (card.isElement(element)) {
                    return true;
                }
            }
            return false;
        }
        else {
            for (const element of this.select_elements) {
                if (!card.isElement(element)) {
                    return false;
                }
            }
            return true;
        }
    };

    sortCards(tab: Card[], type: string) {
        if (type == "Nom") {
            for (let i = 0; i < tab.length; i++) {
                let j = i;
                while (j > 0 && tab[j].name < tab[j - 1].name) {
                    let swap = tab[j];
                    tab[j] = tab[j - 1];
                    tab[j - 1] = swap;

                    j--;
                }
            }
        }
        else if (type == "Niveau") {
            for (let i = 0; i < tab.length; i++) {
                let j = i;
                while (j > 0 && tab[j].level < tab[j - 1].level) {
                    let swap = tab[j];
                    tab[j] = tab[j - 1];
                    tab[j - 1] = swap;
                    j--;
                }
            }
        }

        return tab;
    };
};
