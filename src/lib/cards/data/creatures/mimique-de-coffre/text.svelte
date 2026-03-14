<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";

	// svelte-ignore export_let_unused
	export let system: System;
	// svelte-ignore export_let_unused
	export let card: Card;
</script>

Quand posé : se place sur le terrain adverse.

<br />
<br />

Quand périt sur le terrain : l'adversaire pioche 5 cartes et les verrouille.
