<script>
	export let System;

	function close() {
		if (System.game == undefined) {
			System.pages.change('Menu');
		} else {
			System.pages.change('Game');
		}
	}

	let delay = 1 + System.auto_speed / 500;
</script>

<button
	class="close"
	on:click={() => {
		close();
	}}
>
	X
</button>

<br />
<br />

<div class="slidecontainer">
	<label for="volume" style="transform: translate(0, 20%)">Musique</label>
	<input
		type="range"
		min="0"
		max="100"
		bind:value={System.music.volume}
		on:change={() => {
			System.music.current.volume = System.music.volume / 100;
		}}
		class="slider"
		id="volume"
	/>
	<label for="volume" style="transform: translate(0, 20%);text-align:center;">
		{System.music.volume}%
	</label>
</div>

<br />

<div>
	<input type="checkbox" bind:checked={System.show_intelligence} id="show_intelligence" />
	<label for="show_intelligence">Afficher l'intelligence totale</label>
</div>

<div>
	<input type="checkbox" bind:checked={System.autoplay} id="autoplay" />
	<label for="autoplay">Lance les combats automatiques</label>
</div>

<div class="slidecontainer">
	<label for="volume" style="transform: translate(0, 20%)">Vitesse des combats automatiques</label>
	<input
		type="range"
		min="1"
		max="4"
		bind:value={delay}
		on:change={() => {
			System.auto_speed = delay * 500;
		}}
		class="slider"
		id="volume"
	/>
	<label for="volume" style="transform: translate(0, 20%);text-align:center;">{delay / 2}s</label>
</div>

<style>
	div.slidecontainer {
		width: 40%;
		display: grid;
		grid-template-columns: 10em 10fr 3fr;
	}
</style>
