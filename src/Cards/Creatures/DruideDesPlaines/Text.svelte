<script>
    export let System;
    export let card;
</script>

Quand posé, au choix : se transforme en Druide des plaines (forme humaine) OU se transforme en Druide des plaines (forme loup).
<br/>
{#if card.name == "Druide des plaines (forme humain)"}
    Au début de la phase de préparation : pioche 2 cartes.
{/if}