<script>
    import Zone from '../../../Zone.svelte';
    export let System;
    System;

    function condition (card) {
        return true;
    }

    function fonction (card) {
        System.game.use.card.useEffect(card);
        System.game.use.reset();
    }
</script>

<svelte:component
    this={Zone}
    {System}
    entity={System.game.use.card.owner}
    zone={System.game.use.card.owner.zone("Défausse")}
    {condition}
    {fonction}
/>