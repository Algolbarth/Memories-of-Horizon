import os

CARD_DIRECTORY = './src/lib/cards/data'
DIRECTORIES = ["actions", "bosses", "buildings", "creatures", "equipments", "items", "locations", "spells"]

def check_items(path):
    nb_item = 0
    f = open(path + "/index.ts", "w")
    content = ""

    array = []
    for file in os.listdir(path):
        if "index.ts" not in file:
            array.append(file)

    array.sort()

    for file in array:
        nb_item += 1

        if nb_item > 1:
            content += "\n"

        content += f"export * from './{file}';"

    f.write(content)
    f.close()
    
    return nb_item

def check_all():
    nb_cards = 0
    for DIRECTORY in DIRECTORIES:
        PATH = CARD_DIRECTORY + "/" + DIRECTORY
        nb_items = check_items(PATH)
        nb_cards += nb_items
        print(f"{nb_items} {DIRECTORY}")
    print(f"{nb_cards} cards")

check_all()