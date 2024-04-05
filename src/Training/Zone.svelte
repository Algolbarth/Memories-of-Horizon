<script>
    export let System;
    export let zone;
    export let entity;

    let level = zone.level;
</script>

<div class="zone">
    {zone.name}
    {#if zone.name == "Boutique"}
        Nv
        <input
            type="number"
            min="1"
            max="20"
            bind:value={level}
            on:change={() => {
                if (level < 1) {
                    level = 1;
                }
                else if (level > 20) {
                    level = 20;
                }
                else {
                    zone.level = level;
                }
            }}
        />
    {/if}
    -
    <button
        class="classic"
        on:click={() => {
            System.view.reset();
            System.train.add.entity = entity;
            System.train.add.zone = zone;
            System.pages.change("Training");
        }}
    >
        Ajouter une carte
    </button>
    {#each zone.cards as card, i}
        <div class="preview">
            {#if entity == "player"}
                <div>
                    <button
                        class="classic"
                        on:click={() => {
                            System.view.card = System.cards.getByName(card);
                            System.pages.change("Training");
                        }}
                        on:mouseenter={() => {
                            System.view.quick = System.cards.getByName(card);
                            System.pages.change("Training");
                        }}
                        on:mouseleave={() => {
                            System.view.quick = undefined;
                            System.pages.change("Training");
                        }}>{card}</button
                    >
                </div>
                <div style="text-align:right;">
                    {#if zone.name != "Lieux" || zone.cards.length > 1}
                        <button
                            class="classic"
                            on:click={() => {
                                zone.cards.splice(i, 1);
                                System.pages.change("Training");
                            }}>Enlever</button
                        >
                    {/if}
                </div>
            {:else}
                <div>
                    {#if zone.name != "Lieux" || zone.cards.length > 1}
                        <button
                            class="classic"
                            on:click={() => {
                                zone.cards.splice(i, 1);
                                System.pages.change("Training");
                            }}>Enlever</button
                        >
                    {/if}
                </div>
                <div style="text-align:right;">
                    <button
                        class="classic"
                        on:click={() => {
                            System.view.card = System.cards.getByName(card);
                            System.pages.change("Training");
                        }}
                        on:mouseenter={() => {
                            System.view.quick = System.cards.getByName(card);
                            System.pages.change("Training");
                        }}
                        on:mouseleave={() => {
                            System.view.quick = undefined;
                            System.pages.change("Training");
                        }}>{card}</button
                    >
                </div>
            {/if}
        </div>
    {/each}
</div>

<style>
    .zone {
        background-color: var(--zone);
        border: solid;
        margin: 1%;
        padding: 1%;
    }

    .preview {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    :global(input[type="number"]) {
        font: inherit;
        margin: 0;
        padding: 0;
        width: 3em;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
    }

    :global(input[type="number"]:focus) {
        outline: none;
        border-bottom: 2px solid black;
    }
</style>
