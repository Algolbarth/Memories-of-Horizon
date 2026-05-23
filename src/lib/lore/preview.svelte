<script lang="ts">
    import type { Story } from "./class";

    export let story: Story;
    export let view: Story | undefined;
</script>

<div class="deck">
    <button
        class="cube-cell"
        on:click={() => {
            view = story;
        }}
        aria-label="Deck"
    >
        <svg class="deck" viewBox="0 0 500 530">
            <defs>
                <pattern id="leather" patternUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
                    <rect x="0" y="0" width="500" height="500" fill="#2b5d2d" />
                    <image href="/textures/leather.png" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.2" />
                </pattern>

                <pattern id="paper" patternUnits="userSpaceOnUse" x="0" y="0" width="500" height="500">
                    <rect x="0" y="0" width="500" height="500" fill="rgb(231, 219, 178)" />
                    <image href="/textures/natural-paper.png" x="0" y="0" width="500" height="500" preserveAspectRatio="xMidYMid slice" opacity="0.2" />
                </pattern>

                <linearGradient id="paperLineGradient" gradientUnits="userSpaceOnUse" x1="100" y1="105" x2="340" y2="57">
                    <stop offset="0%" stop-color="black" stop-opacity="0" />
                    <stop offset="50%" stop-color="black" stop-opacity="1" />
                    <stop offset="100%" stop-color="black" stop-opacity="0" />
                </linearGradient>
            </defs>

            <polygon class="face back" points="100,95 350,45 350,365 100,415" />

            <polygon class="face paper" points="100,105 340,57 390,142 150,190" />
            <line x1="100" y1="105" x2="340" y2="57" />
            <line x1="105.6" y1="113.9" x2="345.6" y2="65.9" />
            <line x1="111.1" y1="122.8" x2="351.1" y2="74.8" />
            <line x1="116.7" y1="131.7" x2="356.7" y2="83.7" />
            <line x1="122.2" y1="140.6" x2="362.2" y2="92.6" />
            <line x1="127.8" y1="149.4" x2="367.8" y2="101.4" />
            <line x1="133.3" y1="158.3" x2="373.3" y2="110.3" />
            <line x1="138.9" y1="167.2" x2="378.9" y2="119.2" />
            <line x1="144.4" y1="176.1" x2="384.4" y2="128.1" />
            <line x1="150" y1="185" x2="390" y2="137" />

            <polygon class="face side" points="100,95 150,190 150,510 100,415" />
            <polygon class="face gold" points="100,155 150,240 150,290 100,200" />
            <polygon class="face gold" points="100,305 150,390 150,440 100,350" />

            <polygon class="face front" points="150,190 400,140 400,460 150,510" />
            <polygon class="face gold" points="155,195 395,147 395,450 155,500" />
            <polygon class="face" points="160,200 390,157 390,445 160,495" />
            <polygon class="face gold" points="230,210 330,190 330,230 230,250" />
        </svg>
    </button>

    <div class="container">
        <div></div>

        <button class="name">
            {story.title}
        </button>

        <div></div>
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

    line {
        stroke-width: 1;
        stroke: url(#paperLineGradient);
    }

    polygon.face {
        stroke-width: 3;
        stroke-linejoin: round;
        stroke: black;
        fill: url(#leather);
    }

    polygon.paper {
        fill: url(#paper);
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
</style>
