<script>
    import Zone from "../../../Game/Zone.svelte";
    export let System;
    System;

    let choice = undefined;

    function condition(card) {
        if (card.type == "Créature") {
            return true;
        }
        return false;
    }

    function fonction(card) {
        System.game.use.card.useEffect(card, choice);
        System.game.use.reset();
    }
</script>

{#if choice == undefined}
    <div class="center" style="text-align:center">
        <button
            class="big"
            on:click={() => {
                choice = "life";
            }}>Augmenter la vie de 10</button
        >
        <br />
        <button
            class="big"
            on:click={() => {
                choice = "heal";
            }}>Soigner 20 blessures</button
        >
    </div>
{:else}
    <button
        class="classic"
        on:click={() => {
            choice = undefined;
        }}>Retour</button
    >
    <svelte:component
        this={Zone}
        {System}
        entity={System.game.use.card.owner}
        zone={System.game.use.card.owner.zone("Terrain")}
        {condition}
        {fonction}
    />
{/if}
