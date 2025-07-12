class Ressource {
    constructor(name, color, light_font = false) {
        this.name = name;
        this.color = color;
        this.light_font = light_font;
    };
}

export let ressources = [
    new Ressource("Or", "rgba(200, 150, 0, 1)"),
    new Ressource("Feu", "rgba(200, 0, 0, 1)"),
    new Ressource("Eau", "rgba(50, 50, 200, 1)"),
    new Ressource("Terre", "rgba(100, 50, 0, 1)", true),
    new Ressource("Air", "rgba(150, 150, 150, 1)"),
    new Ressource("Végétal", "rgba(0, 150, 0, 1)"),
    new Ressource("Mort", "rgba(0, 0, 100, 1)", true),
    new Ressource("Metal", "rgba(50, 50, 50, 1)", true),
    new Ressource("Arcane", "rgba(150, 0, 255, 1)"),
    new Ressource("Foudre", "rgba(255, 255, 0, 1)"),
    new Ressource("Glace", "rgba(200, 255, 255, 1)"),
    new Ressource("Lumière", "rgba(255, 255, 255, 1)"),
    new Ressource("Ombre", "rgba(0, 0, 0, 1)", true),
    new Ressource("Mana", "rgba(0, 255, 255, 1)"),
]
