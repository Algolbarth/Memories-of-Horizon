export class RessourceList {
    list: Ressource[] = [
        new Ressource("Or", "rgba(150, 100, 0, 1)"),
        new Ressource("Feu", "rgba(150, 0, 0, 1)"),
        new Ressource("Eau", "rgba(50, 50, 200, 1)", true),
        new Ressource("Air", "rgba(150, 150, 150, 1)"),
        new Ressource("Terre", "rgba(100, 50, 0, 1)", true),
        new Ressource("Nature", "rgba(0, 150, 0, 1)"),
        new Ressource("Mort", "rgba(0, 0, 100, 1)", true),
        new Ressource("Arcane", "rgba(150, 0, 255, 1)"),
        new Ressource("Metal", "rgba(50, 50, 50, 1)", true),
        new Ressource("Foudre", "rgba(255, 255, 100, 1)"),
        new Ressource("Glace", "rgba(0, 200, 200, 1)", true),
        new Ressource("Lumière", "rgba(255, 255, 255, 1)"),
        new Ressource("Ombre", "rgba(0, 0, 0, 1)", true),
        new Ressource("Mana", "rgba(0, 255, 255, 1)"),
        new Ressource("Flux", "linear-gradient(90deg,rgba(219, 24, 24, 1) 8%, rgba(255, 191, 0, 1) 25%, rgba(35, 199, 30, 1) 40%, rgba(27, 189, 141, 1) 55%, rgba(18, 178, 252, 1) 75%, rgba(182, 23, 255, 1) 90%)"),
    ];

    find(name: string = "", element: string = "") {
        for (const ressource of this.list) {
            if (ressource.name == name || ressource.element == element) {
                return ressource;
            }
        }
    };
};

export class Ressource {
    name: string;
    element: string;
    color: string;
    light_font: boolean;

    constructor(name: string, color: string, light_font: boolean = false) {
        this.name = name;

        if (name == "Or") {
            this.element = "Neutre";
        }
        else {
            this.element = name;
        }

        this.color = color;
        this.light_font = light_font;
    };
};
