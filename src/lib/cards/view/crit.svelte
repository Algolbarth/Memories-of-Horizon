<script lang="ts">
    import type { Card } from "../class/card";

    export let card: Card;

    $: ratio_crit = card.stat("Critique").value();
</script>

<div class="critbar">
    <div class="crit" style={"width:" + ratio_crit + "%"}>Test</div>
</div>

<style>
    div.critbar {
        background-color: var(--missing_crit);
        background-image: var(--paper);
        color: transparent;

        height: 1em;

        margin-top: 0.5em;

        border: solid;
        border-color: black;

        display: flex;
    }

    div.crit {
        background-color: var(--crit);
        background-image: var(--paper);
        display: inline-block;
    }
</style>
