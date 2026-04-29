import { Equipment } from "$lib/cards/class/equipment";
import type { Card } from "../cards/class/class";
import type { System } from "../system/class";

export class Filter {
    system: System;

    operators: string[] = ["=", "≠", ">", "≥", "<", "≤"];
    levels: string[] = ["Tous"];
    types: string[] = ["Tous", "Action", "Bâtiment", "Créature", "Objet", "Lieu"];
    families: string[] = [];
    elements: string[] = [];
    stats: string[] = ["Aucune", "Adresse", "Agilité", "Charisme", "Constitution", "Endurance", "Épine", "Force", "Garde", "Intelligence", "Intensité", "Magie", "Maîtrise", "Maniement", "Pénétration", "Percée", "Régénération", "Résistance", "Vitesse"];

    select_name: string = "";

    select_level_operator: string = "=";
    select_level: string = "Tous";

    select_elements: string[] = [];
    select_elements_logic: boolean = true;

    select_type: string = "Tous";

    select_families: string[] = [];
    select_families_logic: boolean = true;

    select_effect: string = "";

    select_common: boolean = true;
    select_rare: boolean = false;
    select_legendary: boolean = false;

    select_stat_operator: string = "≥";
    select_stat_value: number = 1;
    select_stat: string = "Aucune";

    constructor(system: System) {
        this.system = system;

        for (let i = 0; i < 20; i++) {
            this.levels.push("" + (i + 1));
        }
    };

    resetSelection() {
        this.select_name = "";

        this.select_level = "Tous";
        this.select_level_operator = "=";

        this.select_elements = [];
        this.select_elements_logic = true;

        this.select_type = "Tous";

        this.select_families = [];
        this.select_families_logic = true;

        this.select_effect = "";

        this.select_common = true;
        this.select_rare = false;
        this.select_legendary = false;

        this.select_stat_operator = "≥";
        this.select_stat_value = 1;
        this.select_stat = "Aucune";
    };

    isReset() {
        if (this.select_name != "" ||
            this.select_level != "Tous" || this.select_level_operator != "=" ||
            this.select_elements.length > 0 || this.select_elements_logic == false ||
            this.select_type != "Tous" ||
            this.select_families.length > 0 || this.select_families_logic == false ||
            this.select_effect != "" ||
            this.select_common == false || this.select_rare == true || this.select_legendary == true ||
            this.select_stat_operator != "≥" || this.select_stat_value > 1 || this.select_stat != "Aucune") {
            return false;
        }
        return true;
    };

    changeSelection(name: string, level: string, level_operator: string, elements: string[], elements_logic: boolean, type: string, families: string[], families_logic: boolean, effect: string, common: boolean, rare: boolean, legendary: boolean, stat_operator: string, stat_value: number, stat: string) {
        this.select_name = name;

        this.select_level = level;
        this.select_level_operator = level_operator;

        this.select_elements = elements;
        this.select_elements_logic = elements_logic;

        this.select_type = type;

        this.select_families = families;
        this.select_families_logic = families_logic;

        this.select_effect = effect;

        this.select_common = common;
        this.select_rare = rare;
        this.select_legendary = legendary;

        this.select_stat_operator = stat_operator;
        this.select_stat_value = stat_value;
        this.select_stat = stat;
    };

    filterString(card_names: string[], sort_type: string, condition: Function | undefined = undefined) {
        let cards: Card[] = [];

        for (const name of card_names) {
            cards.push(this.system.cards.getByName(name));
        }

        cards = this.filterCards(cards, sort_type, condition);

        let names: string[] = [];
        for (const card of cards) {
            names.push(card.name);
        }

        return names;
    };

    filterCards(cards: Card[], sort_type: string, condition: Function | undefined = undefined) {
        let tab = [];

        for (const card of cards) {
            if (this.filterByName(card) && this.filterByEffect(card) && this.filterByLevel(card) && this.filterByType(card) && this.filterByFamily(card) && this.filterByElement(card) && this.filterByStat(card) && this.filterByRarity(card) && (condition == undefined || condition(card))) {
                tab.push(card);
            }
        }

        tab = this.sortCards(tab, sort_type);

        return tab;
    };

    filterByName(card: Card) {
        return (this.select_name == "" || card.name.toLowerCase().includes(this.select_name.toLowerCase()));
    };

    filterByLevel(card: Card) {
        if (this.select_level == "Tous") {
            return true;
        }

        return this.useOperator(card.level, this.select_level_operator, parseInt(this.select_level));
    };

    filterByElement(card: Card) {
        if (this.select_elements.length == 0) {
            return true;
        }

        if (this.select_elements_logic) {
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

    filterByType(card: Card) {
        return (this.select_type == "Tous" || card.type == this.select_type);
    };

    filterByFamily(card: Card) {
        if (this.select_families.length == 0) {
            return true;
        }

        if (this.select_families_logic) {
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

    filterByEffect(card: Card) {
        if (this.select_effect == "") {
            return true;
        }

        let text: string = "";
        for (const effect of card.effects) {
            if (effect.condition()) {
                text = text + effect.text;
            }

        }

        text = text.replaceAll("[satiety ", "Satieté");
        text = text.replaceAll("[resolve ", "Résolution");
        text = text.replaceAll("[luck ", "Chance");
        text = text.replaceAll("[prime ", "Prime").replaceAll("[prime_inf ", "Prime infinie");
        text = text.replaceAll("[source ", "Source").replaceAll("[source_inf ", "Source infinie");
        text = text.replaceAll("[blaze ", "Embrasement").replaceAll("[blaze_inf ", "Embrasement infini");
        text = text.replaceAll("[sorcery ", "Sorcellerie");
        text = text.replaceAll("[choice ", "").replaceAll("[option ", "");
        text = text.replaceAll("{card:", "");
        text = text.replaceAll("{jump:1}", "");
        text = text.replaceAll("{variable:", "");
        text = text.replaceAll("[if ", "");
        text = text.replaceAll("[details ", "");
        text = text.replaceAll("]", "").replaceAll("}", "").replaceAll("{", "");;

        return text.toLowerCase().includes(this.select_effect.toLowerCase());
    };

    filterByRarity(card: Card) {
        return (this.select_legendary && card.trait("Légendaire").value()) || (this.select_rare && card.trait("Rare").value()) || (this.select_common && card.trait("Commune").value());
    };

    filterByStat(card: Card) {
        if (this.select_stat == "Aucune") {
            return true;
        }

        if (card instanceof Equipment) {
            return this.useOperator(card.equipStat(this.select_stat).value(), this.select_stat_operator, this.select_stat_value);
        }
        else {
            return this.useOperator(card.stat(this.select_stat).value(), this.select_stat_operator, this.select_stat_value);
        }
    };

    useOperator(card_value: number, operator: string, value: number) {
        if (operator == "=") {
            return card_value == value;
        }
        else if (operator == "≠") {
            return card_value != value;
        }
        else if (operator == ">") {
            return card_value > value;
        }
        else if (operator == "≥") {
            return card_value >= value;
        }
        else if (operator == "<") {
            return card_value < value;
        }
        else if (operator == "≤") {
            return card_value <= value;
        }
    };

    sortCards(tab: Card[], type: string) {
        if (type == "Nom") {
            for (let i = 0; i < tab.length; i++) {
                let j = i;
                while (j > 0 && tab[j - 1].name.localeCompare(tab[j].name, "fr") > 0) {
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
