<script>
    import Zone from '../../../Zone.svelte';
    export let System;
    System;

    function condition (card) {
        if (card.type == "Créature" && card.stat("Maniement").value() == 1) {
            return true;
        }
        return false;
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
    zone={System.game.use.card.owner.zone("Terrain")}
    {condition}
    {fonction}
/>