<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";
	import Satiety from "$lib/cards/utils/satiety.svelte";

	// svelte-ignore export_let_unused
	export let system: System;
	// svelte-ignore export_let_unused
	export let card: Card;
</script>

Soigne 10 blessures à une créature sur votre terrain.

<Satiety bind:system bind:card text={"augmente de 1 votre production d'or à la place."} />
