<script>
  import Root from "./lib/Root/Page.svelte";
  import { Train } from "./lib/Training/Train.js";

  export let System = {
    ressources: [
      "Or",
      "Feu",
      "Eau",
      "Terre",
      "Air",
      "Végétal",
      "Mort",
      "Metal",
      "Arcane",
      "Foudre",
      "Glace",
      "Lumière",
      "Ombre",
      "Mana",
    ],
    cards: {
      class: [],
      instance: [],
      getByName: function (name) {
        for (let i = 0; i < this.instance.length; i++) {
          if (this.instance[i].name == name) {
            return new this.class[i](System);
          }
        }
        return undefined;
      },
    },
    chapters: {
      class: [],
      instance: [],
      getRandom: function (number) {
        let level = parseInt((number - 1) / 5) + 1;
        return new this.class[level][
          parseInt(Math.random() * this.class[level].length)
        ](System, number);
      },
    },
    bosses: {
      class: [],
      instance: [],
      getRandom: function (number) {
        let level = parseInt((number - 1) / 10) + 1;
        return new this.class[level][
          parseInt(Math.random() * this.class[level].length)
        ](System, number);
      },
    },
    sort: {
      levels: ["Tous"],
      types: ["Tous", "Action", "Bâtiment", "Créature", "Objet", "Lieu"],
      familles: ["Toutes"],
      elements: ["Tous"],
    },
    copy: function (array) {
      let tab = [];
      for (const element of array) {
        tab.push(element);
      }
      return tab;
    },
    shuffle: function (array) {
      let i = array.length;
      while (i != 0) {
        let j = Math.floor(Math.random() * i);
        i--;

        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    several: function (value, name) {
      let text = "";
      text += value + " " + name;
      if (value > 1) {
        text += "s";
      }
      return text;
    },
    view: {
      quick: undefined,
      card: undefined,
      reset: function () {
        this.quick = undefined;
        this.card = undefined;
      },
    },
    decks: [],
    train: new Train(),
    game: undefined,
    music: {
      current: undefined,
      volume: 50,
      list: [],
      slot: 0,
      number: 4,
      init: function () {
        for (let i = 1; i < System.music.number; i++) {
          System.music.list.push(i);
        }
        System.shuffle(System.music.list);
      },
      play: function () {
        if (this.slot < this.list.length - 1) {
          this.current = new Audio("src/assets/Music/" + this.list[this.slot] + ".mp3");
          this.current.addEventListener("ended", function () {
            this.play();
          });
          this.current.volume = this.volume / 100;
          this.current.play();
          this.slot++;
        } else {
          this.slot = 0;
          this.play();
        }
      },
    },
    stories: [],
    show_intelligence: false,
    autoplay: false,
    auto_speed: 1000,
  };

  for (let i = 0; i < 20; i++) {
    System.sort.levels.push(i + 1);
  }

  for (const element of System.ressources) {
    if (element == "Or") {
      System.sort.elements.push("Neutre");
    } else if (element != "Mana") {
      System.sort.elements.push(element);
    }
  }

  import * as cards from "./lib/Cards";
  for (const card of Object.keys(cards)) {
    let cardClass = cards[card];
    let cardInstance = new cardClass(System);

    for (const famille of cardInstance.familles.base) {
      if (!System.sort.familles.includes(famille)) {
        System.sort.familles.push(famille);
      }
    }

    System.cards.class.push(cardClass);
    System.cards.instance.push(cardInstance);
  }

  for (let i = 0; i < System.sort.familles.length; i++) {
    let j = i;
    while (
      j > 1 &&
      System.sort.familles[j - 1].localeCompare(System.sort.familles[j]) > 0
    ) {
      let swap = System.sort.familles[j];
      System.sort.familles[j] = System.sort.familles[j - 1];
      System.sort.familles[j - 1] = swap;
      j--;
    }
  }

  for (let i = 0; i <= 20; i++) {
    System.chapters.class.push([]);
    System.chapters.instance.push([]);
  }
  for (let i = 0; i <= 10; i++) {
    System.bosses.class.push([]);
    System.bosses.instance.push([]);
  }

  import * as chapters from "./lib/Chapters/Data";
  for (const chapter of Object.keys(chapters)) {
    let chapterClass = chapters[chapter];
    let chapterInstance = new chapterClass(System, 0);

    let error = false;
    for (const step of chapterInstance.steps) {
      let ressources = [];
      for (const ressource of System.ressources) {
        ressources.push({
          name: ressource,
          value: 0,
        });
      }
      for (const card of step.cards) {
        if (System.cards.getByName(card) == undefined) {
          console.log("Invalid card in a chapter : " + card);
          error = true;
        } else {
          for (let i = 0; i < System.cards.getByName(card).cout.length; i++) {
            ressources[i].value += System.cards.getByName(card).cout[i].value();
          }
        }
      }
      for (const ressource of chapterInstance.ressources) {
        for (const cout of ressources) {
          if (cout.name == ressource.name && cout.value > ressource.value) {
            console.log(
              "Invalid ressources in a chapter : " +
                ressource.name +
                " " +
                (cout.value - ressource.value),
            );
            error = true;
          }
        }
      }
    }

    let level = chapterInstance.getLevel();
    if (chapterInstance.boss) {
      System.bosses.class[level / 2].push(chapterClass);
      System.bosses.instance[level / 2].push(chapterInstance);
    } else {
      System.chapters.class[level].push(chapterClass);
      System.chapters.instance[level].push(chapterInstance);
    }

    if (error) {
      console.log(chapterClass);
    }
  }

  import * as stories from "./lib/Stories";
  for (const story of Object.keys(stories)) {
    System.stories.push(new stories[story]());
  }
  for (let i = 0; i < System.stories.length; i++) {
    let j = i;
    while (j > 0 && System.stories[j - 1].id > System.stories[j].id) {
      let trans = System.stories[j];
      System.stories[j] = System.stories[j - 1];
      System.stories[j - 1] = trans;
      j--;
    }
  }

  System.music.init();
  System.page = "BlackScreen";
</script>

<div class="window">
  <div class="body">
    <Root bind:System />
  </div>
</div>
