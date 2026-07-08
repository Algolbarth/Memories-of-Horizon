import type { Zone } from "$lib/game/zone";
import type { Card } from "../class/card";

export class UserInterface {
    card: Card;
    panels: (Choice | Target)[] = [];
    selected_panel: number = 0;
    first_choice: any = undefined;

    constructor(card: Card) {
        this.card = card;
    };

    addChoice(choices: Button[]) {
        this.panels.push(new Choice(this, choices));

        return this;
    };

    addTarget(zones: Zone[], condition: Function, action: Function) {
        this.panels.push(new Target(this, zones, condition, action));

        return this;
    };
};

export class Choice {
    user_interface: UserInterface;
    choices: Button[] = [];

    constructor(user_interface: UserInterface, choices: Button[]) {
        this.user_interface = user_interface;
        this.choices = choices;
    };
};

export class Button {
    text: string[];
    action: Function;

    constructor(text: string[], action: Function) {
        this.text = text;
        this.action = action;
    };
};

export class Target {
    user_interface: UserInterface;
    zones: Zone[];
    condition: Function;
    action: Function;

    constructor(user_interface: UserInterface, zones: Zone[], condition: Function, action: Function) {
        this.user_interface = user_interface;
        this.zones = zones;
        this.condition = condition;
        this.action = action;
    };
};