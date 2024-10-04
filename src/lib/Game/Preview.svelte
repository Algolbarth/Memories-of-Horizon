<script>
    export let System;
    export let card;
    export let condition;
    export let fonction;

    $: isPlayer = card.owner == System.game.player ? true : false;
</script>

<div
    class={(isPlayer || fonction != undefined ? "container " : "") +
        (card == System.game.fighter ? "attacker " : "") +
        "preview"}
>
    <div id={isPlayer || fonction != undefined ? "infos" : ""}>
        {#if card.verrou}
            <div id="verrou">&#x1F512</div>
        {/if}
        {#if !card.cache}
            <button
                class="classic"
                on:click={() => {
                    System.view.card = card;
                    System.pages.change("Game");
                }}
                on:mouseenter={() => {
                    System.view.quick = card;
                    System.pages.change("Game");
                }}
                on:mouseleave={() => {
                    System.view.quick = undefined;
                    System.pages.change("Game");
                }}
            >
                {card.name}
            </button>
        {:else}
            <button>???</button>
        {/if}
    </div>
    
    {#if isPlayer || fonction != undefined}
        <div id="actions">
            {#if System.game.phase == "Préparation" && fonction == undefined}
                {#if card.zone.name == "Main" || card.zone.name == "Terrain"}
                    <button
                        class="classic"
                        on:click={() => {
                            card.sell();
                        }}>Vendre</button
                    >
                {/if}
                {#if card.zone.name == "Boutique"}
                    <button
                        class="classic"
                        on:click={() => {
                            card.buy();
                        }}>Acheter</button
                    >
                {:else if card.zone.name == "Main"}
                    <button
                        class="classic"
                        on:click={() => {
                            card.use();
                        }}>Poser</button
                    >
                {:else if card.zone.name == "Lieux"}
                    {#if card == card.owner.place}
                        Actif
                    {:else}
                        <button
                            class="classic"
                            on:click={() => {
                                card.owner.place = card;
                                System.pages.change("Game");
                            }}>Changer</button
                        >
                    {/if}
                {/if}
                {#if card.zone.name == "Main" || (card.zone.name == "Terrain" && card.type == "Créature")}
                    {#if card.slot > 0}
                        <button
                            class="classic"
                            on:click={() => {
                                card.up();
                                System.pages.change("Game");
                            }}>&#9650</button
                        >
                    {:else}
                        <button class="classic useless">&#9650</button>
                    {/if}
                    {#if card.slot < card.zone.cards.length - 1}
                        <button
                            class="classic"
                            on:click={() => {
                                card.down();
                                System.pages.change("Game");
                            }}>&#9660</button
                        >
                    {:else}
                        <button class="classic useless">&#9660</button>
                    {/if}
                {/if}
            {/if}
            {#if fonction != undefined}
                {#if condition(card)}
                    <button
                        class="classic"
                        on:click={() => {
                            fonction(card);
                        }}>Sélectionner</button
                    >
                {/if}
            {/if}
        </div>
    {/if}
</div>

<style>
    :global(.preview) {
        border: solid;
        margin-top: 1%;
        margin-bottom: 1%;
        margin-right: 2%;
        padding: 1%;
        transition: all var(--delay) ease-in-out;
        background-color: var(--preview);
    }

    :global(.preview:hover) {
        transition: all var(--delay_hover) ease-in-out;
        background-color: var(--preview_hover);
    }

    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .attacker {
        transition: all 0s ease-in-out;
        background-color: var(--attacker);
    }

    .attacker:hover {
        transition: all var(--delay_hover) ease-in-out;
        background-color: var(--attacker_hover);
    }

    .useless {
        color:lightgrey;
    }

    #infos {
        text-align: left;
    }

    #actions {
        text-align: right;
    }

    #verrou {
        display: inline-block;
        font-size: small;
    }
</style>
