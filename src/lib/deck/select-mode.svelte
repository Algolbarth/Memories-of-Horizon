<script lang="ts">
	import type { System } from "$lib/system/class";

	export let system: System;
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				system.page = "Menu";
			}}
		>
			X
		</button>
	</div>

	<div>
		<button class="taskbar">Decks</button>
	</div>
</div>

<div id="body">
	<button
		class="big menu"
		on:click={() => {
			system.page = "StandardDecks";
		}}
	>
		Standard
	</button>

	<br />
	<br />

	<button
		class="big menu"
		on:click={() => {
			system.page = "WildDecks";
		}}
	>
		Libre
	</button>
</div>

<style>
	#body {
		text-align: center;
	}
</style>
