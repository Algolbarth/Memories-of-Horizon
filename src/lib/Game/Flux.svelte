<script>
    export let System;

    function close() {
        System.game.flux = false;
        System.pages.change("Game");
    }

    let tab = [
        "Feu",
        "Terre",
        "Végétal",
        "Eau",
        "Air",
        "Mort",
        "Metal",
        "Foudre",
        "Lumière",
        "Arcane",
        "Glace",
        "Ombre",
    ];
</script>

{#if System.game.flux}
    <div id="body" class="center">
        <div style="text-align:right;">
            <button
                class="close"
                on:click={() => {
                    close();
                }}>X</button
            >
        </div>
        <br />
        <div class="container">
            {#each tab as ressource}
                <div class="ressource">
                    <button class="big" on:click={() => {
                        System.game.player.ressource(ressource).current++;
                        System.game.player.ressource(ressource).max++;
                        System.game.player.flux--;
                        if (System.game.player.flux == 0) {
                            System.game.flux = false;
                        }
                        System.pages.change("Game");
                    }}>{ressource}</button>
                    <br />
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    #body {
        background-color: var(--card);
        width: 50%;
        min-height: max-content;
        max-height: 60vh;
        padding: 1%;
        border: solid;
        border-width: 5px;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .ressource {
        text-align: center;
    }

    button.big {
        height: 10vh;
        width: 80%;
    }
</style>
