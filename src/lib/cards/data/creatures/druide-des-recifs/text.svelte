<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";
	import DruidText from "$lib/cards/utils/druid-text.svelte";

	export let system: System;
	export let card: Card;
</script>

<DruidText bind:system bind:card />

{#if card.name == "Druide des récifs (forme ondin)"}
	Quand se prépare sur le terrain : augmente de 1 votre production d'eau.
{/if}
