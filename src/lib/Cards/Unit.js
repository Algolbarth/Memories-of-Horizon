import { Card } from './Card.js';

export class Unit extends Card {
    constructor(System) {
        super(System);

        this.addTrait("Inactif", false);
        this.trait("Inactif").value = function () {
            if (this.card.stat("Actions").value() == 0) {
                return true;
            }
            return false;
        };

        this.addStat("Défense", 0);

        this.addStat("Vie", 1, 1);
        this.stat("Vie").current = 1;

        this.addStat("Garde", 0);

        this.addStat("Actions", 1);
        this.stat("Actions").current = 1;

        this.addStat("Multicoup", 1);

        this.addStat("Vitesse", 0);

        this.addStat("Protection", 0);

        this.addStat("Esquive", 0);

        this.addStat("Magie", 0);

        this.addStat("Intelligence", 0);
    };

    useEffect = function () {
        this.move("Terrain");
        this.pose();
    };

    heal = function (value) {
        this.stat("Vie").current += value;
        if (this.stat("Vie").current > this.stat("Vie").value()) {
            this.stat("Vie").current = this.stat("Vie").value();
        }
    };

    damage = function (value) {
        let result = {
            value: value,
            die: false
        }

        if (this.stat("Esquive").value() == 0) {
            if (this.stat("Garde").value() > result.value) {
                this.stat("Garde").remove(result.value);
                result.value = 0;
            }
            else {
                result.value -= this.stat("Garde").value();
                this.stat("Garde").add = 0;
                this.stat("Garde").step = 0;
            }

            this.stat("Vie").current -= result.value;

            if (this.stat("Vie").current <= 0) {
                result.die = true;
                this.die();
            }
        }
        else {
            result.value = 0;
            this.stat("Esquive").remove(1);
        }

        return result;
    };

    die = function () {
        this.stat("Vie").current = 0;

        this.dieEffect();
        for (const entity of [this.System.game.player, this.System.game.bot]) {
            for (const zone of entity.zones) {
                let cpy = this.System.copy(zone.cards);
                for (const card of cpy) {
                    if (card != this) {
                        card.otherDieEffect(this);
                        if (card.type == "Créature") {
                            for (const e of card.equipments) {
                                e.otherDieEffect(this);
                            }
                        }
                    }
                }
            }
        }

        this.dieGo();
    };

    dieGo = function () {
        this.move("Défausse");
    };

    dieEffect = function () {

    };

    destroy = function () {
        if (!this.trait("Légendaire").value()) {
            this.die();
        }
    };

    play = function () {
        this.stat("Actions").current--;
        this.playEffect();
    };

    playEffect = function () {

    };
}