<script lang="ts">
	import CardInfo from "$lib/cards/utils/card-info.svelte";
	import type { System } from "$lib/system/class";
	import type { Card } from "$lib/cards/class/class";
	import Sorcery from "$lib/cards/utils/sorcery.svelte";

	export let system: System;
	export let card: Card;
</script>

Au choix :
<ul>
	<li>
		Génère <CardInfo bind:system name={"Élémentaire de roche"} /> sur votre terrain.
	</li>
	<li>
		Génère <CardInfo bind:system name={"Mur de roche"} /> sur votre terrain.
	</li>
</ul>

<Sorcery bind:system bind:card cost={50} text={"génère les deux sur le terrain à la place."} />
