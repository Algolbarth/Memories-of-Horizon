<script lang="ts">
	import type { System } from "$lib/system/class";

	export let system: System;
</script>

<div id="body">
	L'histoire s'arrête ici...

	<br /><br />

	<button
		class="big"
		on:click={() => {
			system.page = "Menu";
		}}
	>
		Retour à l'écran titre
	</button>
</div>

<style>
	#body {
		text-align: center;
	}
</style>
