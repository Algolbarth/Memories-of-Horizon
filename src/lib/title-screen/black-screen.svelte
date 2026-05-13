<script lang="ts">
	import type { System } from "$lib/system/class";

	export let system: System;
</script>

<div id="body">
	<div class="center">
		<button
			on:click={() => {
				system.music.play();
				system.page = "TitleScreen";
			}}
		>
			Jouer
		</button>
	</div>

	<div id="credits">
		by
		<button
			on:click={() => {
				window.open("https://github.com/algolbarth");
			}}
		>
			Algolbarth
		</button>
		-
		<button
			on:click={() => {
				window.open("https://github.com/algolbarth/memories-of-horizon");
			}}
		>
			Github Repository
		</button>
		-
		<button
			on:click={() => {
				window.open("https://algolbarth.github.io/");
			}}
		>
			Website
		</button>

		<br />

		version {PKG.version} - 2026
	</div>
</div>

<style>
	#body {
		color: white;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: black;
	}

	#credits {
		text-align: center;
		position: absolute;
		bottom: 5vh;
		width: 100vw;
	}

	button {
		color: white;
	}
</style>
