<script>
    import Zone from '../../../Zone.svelte';
    export let System;
    System;

    let choice = undefined;

    function condition (card) {
        if (card.type == "Créature" && card.canEquip()) {
            return true;
        }
        return false;
    }

    function condition2 (card) {
        return true;
    }

    function fonction (card) {
        System.game.use.card.useEffect(card, choice);
        System.game.use.reset();
    }
</script>

{#if choice == undefined}
    <div class="center" style="text-align:center">
        <button
            class="big"
            on:click={() => {
                choice = "equip";
            }}>S'équipe à une créature alliée sur le terrain</button
        >
        <br />
        <button
            class="big"
            on:click={() => {
                choice = "damage";
            }}>Inflige 5 dégâts à une unité adverse sur le terrain</button
        >
    </div>
{:else if choice == "equip"}
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
{:else if choice == "damage"}
    <button
        class="classic"
        on:click={() => {
            choice = undefined;
        }}>Retour</button
    >
    <svelte:component
        this={Zone}
        {System}
        entity={System.game.use.card.owner.adversary()}
        zone={System.game.use.card.owner.adversary().zone("Terrain")}
        condition={condition2}
        {fonction}
    />
{/if}