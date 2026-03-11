<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";
	import Sorcery from "$lib/cards/utils/sorcery.svelte";

	export let system: System;
	export let card: Card;
</script>

Augmente de 3 votre production d'eau.

<br />
<br />

<Sorcery bind:system bind:card cost={10} text={"augmente de 5 votre production d'eau à la place."} />
