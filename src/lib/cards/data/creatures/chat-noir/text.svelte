<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";

	// svelte-ignore export_let_unused
	export let system: System;
	// svelte-ignore export_let_unused
	export let card: Card;
</script>

Quand posé : diminue de 5 votre production en or.

<br />
<br />

Quand attaque : produit 1 or, stocke 1 or et augmente de 1 votre production en or.
