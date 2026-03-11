<script lang="ts">
	import CardInfo from "$lib/cards/utils/card-info.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";

	export let system: System;
	// svelte-ignore export_let_unused
	export let card: Card;
</script>

Quand <CardInfo bind:system name={"Clé en or"} /> est posée : si sur le terrain : augmente de 1 le niveau de votre pile pendant ce tour.

<br />
<br />

Quand <CardInfo bind:system name={"Crochetage"} /> est posée : si sur le terrain : réduit de 1 le niveau de votre pile pendant ce tour.
