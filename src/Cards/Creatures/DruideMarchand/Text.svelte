<script>
    export let System;
    export let card;
</script>

Quand posé, au choix : se transforme en Druide marchand (forme humaine) OU se transforme en Druide marchand (forme boeuf).
<br/>
{#if card.name == "Druide marchand (forme humain)"}
    Au début de la phase de préparation : augmente de 1 la capacité en or.
{/if}