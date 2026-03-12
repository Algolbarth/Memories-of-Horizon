<script lang="ts">
	import CardInfo from "$lib/cards/utils/card-info.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";

	export let system: System;
	// svelte-ignore export_let_unused
	export let card: Card;
</script>

Quand posé : génère <CardInfo bind:system name={"Monture de chevalier"} /> sur votre pile et réduis de 40 le coût de cette carte.
