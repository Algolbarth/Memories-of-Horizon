<script>
    export let System;
    export let card;
</script>

<div class="box">
    <i>Équipements</i>
    ({card.equipments.length} / {card.stat("Maniement").value()})
    <br />
    {#each card.equipments as equipment}
        <button class="classic" on:click={() => {
            System.view.card = equipment;
            System.pages.change("Game");
        }}>{equipment.name}</button>
        <br/>
    {/each}
</div>