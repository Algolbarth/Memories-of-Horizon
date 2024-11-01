<script>
	export let System;

	function close() {
		if (System.game == undefined) {
			System.pages.change('Menu');
		} else {
			System.pages.change('Game');
		}
	}
</script>

<button
	class="close"
	on:click={() => {
		close();
	}}>X</button
>

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
</div>

<br />

<div>
	<input type="checkbox" bind:checked={System.show_intelligence} id="show_intelligence" />
	<label for="show_intelligence">Afficher l'intelligence totale</label>
</div>

<style>
	div.slidecontainer {
		width: 30%;
		display: grid;
		grid-template-columns: 3fr 10fr;
	}
</style>
