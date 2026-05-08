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
		<button class="taskbar">Modes de jeu</button>
	</div>
</div>

<div id="body">
	<button
		class="big menu"
		on:click={() => {
			system.page = "Standard";
		}}
	>
		Standard
	</button>

	<br />
	<br />

	<button
		class="big menu"
		on:click={() => {
			system.page = "Wild";
		}}
	>
		Libre
	</button>

	<br />
	<br />
	<br />
	<br />

	<button
		class="big menu"
		on:click={() => {
			system.page = "Training";
		}}
	>
		Entraînement
	</button>
</div>

<style>
	#body {
		text-align: center;
	}
</style>
