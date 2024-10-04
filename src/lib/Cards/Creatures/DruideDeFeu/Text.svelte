<script>
    export let System;
    export let card;
</script>

Quand posé, au choix : se transforme en Druide de feu (forme gobelin) OU se transforme en Druide de feu (forme lézard).
<br/>
{#if card.name == "Druide de feu (forme gobelin)"}
    Au début de la phase de préparation : augmente son attaque de 10.
{/if}