<script>
	export let System;
</script>

<div id="body">
	<div class="center">
		<button
			on:click={() => {
				System.music.play();
				System.page = "TitleScreen";
			}}
		>
			Jouer
		</button>
	</div>
	<div id="credits">
		by
		<button
			on:click={() => {
				window.open("https://github.com/Algolbarth");
			}}
		>
			Algolbarth
		</button>
		-
		<button
			on:click={() => {
				window.open("https://github.com/Algolbarth/MoH");
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
		version BETA - 2024
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
