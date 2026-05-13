export function several(value: number, name_list: string[], emplacement: string = "before") {
    let text: string = "";

    if (!["before", "after", "none"].includes(emplacement)) {
        console.log("aucun emplacement reconnu pour la fonction several");
        return "ERROR";
    }

    if (emplacement == "before") {
        text += value;
    }

    for (const name of name_list) {
        text += " " + name;
        if (value > 1) {
            if (name.endsWith("eu")) {
                text += "x";
            }
            else {
                text += "s";
            }
        }
    }

    if (emplacement == "after") {
        text += " : " + value;
    }

    return text;
};