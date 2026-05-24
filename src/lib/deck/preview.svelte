<script lang="ts">
    import type { System } from "$lib/system/class";
    import type { Deck } from "./class";

    export let system: System;
    export let deck: Deck;
    export let fonction: Function;
    export let index: number;
    export let side_view: string;
    export let can_deplace: boolean;

    function check_side(index: number) {
        if (index % 5 > 2) {
            side_view = "left";
        } else {
            side_view = "right";
        }
    }
</script>

<div class="deck">
    <button
        class="cube-cell"
        on:click={() => {
            fonction();
        }}
        aria-label="Deck"
    >
        <svg class="deck" viewBox="0 0 500 500">
            <defs>
                <pattern id="standard" patternUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
                    <rect x="0" y="0" width="500" height="500" class="standard" />
                    <image href="/textures/leather.png" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.2" />
                </pattern>

                <pattern id="wild" patternUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
                    <rect x="0" y="0" width="500" height="500" class="wild" />
                    <image href="/textures/leather.png" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.2" />
                </pattern>

                <pattern id="train" patternUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
                    <rect x="0" y="0" width="500" height="500" class="train" />
                    <image href="/textures/leather.png" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.2" />
                </pattern>
            </defs>

            <polygon class={"face left " + deck.mode} points="10,95 250,185 250,500 10,405" />
            <polygon class="points" points="15,105 245,190 245,490 15,400" />

            <polygon class={"face right " + deck.mode} points="250,275 490,185 490,405 250,500" fill="url(#standard)" />
            <polygon class="points" points="255,280 485,195 485,400 255,490" />

            <polygon class="top" points="10,95 250,5 490,95 250,185" />

            <polygon class={"face hover " + deck.mode} points="250,185 490,95 490,185 250,275" fill="url(#standard)" />
            <polygon class="points" points="255,190 485,105 485,180 255,265" />

            <polygon class={"face cache " + deck.mode} points="10,95 250,5 490,95 250,185" fill="url(#standard)" />
            <polygon class="points" points="25,95 250,10 475,95 250,180" />

            <polygon class="face gold" points="350,185 400,165 400,195 350,215" />
        </svg>
    </button>

    <div class="container">
        <div style="display:flex;align-items:center;transform: scale(-1, 1)">
            {#if can_deplace}
                {#if index > 0}
                    <button
                        class="active arrow"
                        on:click={() => {
                            let temp = system.wild_decks[index - 1];
                            system.wild_decks[index - 1] = deck;
                            system.wild_decks[index] = temp;
                        }}
                    >
                        ➤
                    </button>
                {:else}
                    <button class="desactivate">➤</button>
                {/if}
            {/if}
        </div>

        <button
            class="name"
            on:mouseenter={() => {
                check_side(index);
                system.view.quick = deck;
            }}
            on:mouseleave={() => {
                check_side(index);
                system.view.quick = undefined;
            }}
            on:click={() => {
                if (deck != system.view.card) {
                    check_side(index);
                    system.view.card = deck;
                } else {
                    system.view.reset();
                }
            }}
        >
            {deck.name}
        </button>

        <div style="display:flex;align-items:center;">
            {#if can_deplace}
                {#if index < system.wild_decks.length - 1}
                    <button
                        class="active arrow"
                        on:click={() => {
                            let temp = system.wild_decks[index + 1];
                            system.wild_decks[index + 1] = deck;
                            system.wild_decks[index] = temp;
                        }}
                    >
                        ➤
                    </button>
                {:else}
                    <button class="desactivate">➤</button>
                {/if}
            {/if}
        </div>
    </div>
</div>

<style>
    div.deck {
        position: relative;
        height: 100%;
        text-align: center;
        scroll-snap-align: start;
    }

    button.cube-cell {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    svg.deck {
        width: 100%;
        height: 100%;
        display: block;
    }

    svg.deck:hover {
        .top,
        .hover {
            filter: drop-shadow(-10px 10px 20px rgba(0, 0, 0, 0.3));
        }
    }

    rect.standard {
        fill: rgb(173, 87, 0);
    }

    rect.wild {
        fill: rgb(100, 50, 0);
    }

    rect.train {
        fill: rgb(100, 0, 0);
    }

    polygon.face {
        stroke-width: 3;
        stroke-linejoin: round;
        stroke: black;
    }

    polygon.standard {
        fill: url(#standard);
    }

    polygon.wild {
        fill: url(#wild);
    }

    polygon.train {
        fill: url(#train);
    }

    polygon.points {
        fill: none;
        stroke: black;
        stroke-width: 2;
        stroke-dasharray: 10 5;
    }

    polygon.gold {
        fill: gold;
    }

    div.container {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: grid;
        grid-template-columns: 1em auto 1em;
    }

    button.name {
        background-color: var(--card);
        background-image: var(--paper);
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid;
        height: 2em;
    }

    button.name:hover {
        border-color: black;
        color: black;
        background-color: var(--card_hover);
    }

    button.arrow {
        color: var(--link_hover);
    }

    button.arrow:hover {
        color: rgba(255, 255, 0, 1);
    }
</style>
