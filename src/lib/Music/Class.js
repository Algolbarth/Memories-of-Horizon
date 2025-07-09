import { shuffle } from '../Utils/Class';

export class Music {
    current = undefined;
    volume = 50;
    list = [];
    slot = 0;
    number = 4;

    constructor(System) {
        this.System = System;
    };

    init() {
        for (let i = 1; i < this.number; i++) {
            this.list.push(i);
        }
        shuffle(this.list);
    };

    play() {
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
    };
};