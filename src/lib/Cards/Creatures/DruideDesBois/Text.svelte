<script>
    export let System;
    export let card;
</script>

Quand posé, au choix : se transforme en Druide des bois (forme elfe) OU se transforme en Druide des bois (forme renard).
<br/>
{#if card.name == "Druide des bois (forme elfe)"}
    Quand une action alliée est jouée : augmente de 3 sa vie.
{/if}