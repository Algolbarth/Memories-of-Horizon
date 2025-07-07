<script>
	export let System;

	function close() {
		if (System.game == undefined) {
			System.page = "Menu";
		} else {
			System.page = "Game";
		}
	}

	let delay = System.auto_speed / 500;
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

<div class="checkbox-container">
	<label class="form-control" for="show_intelligence">
		<input
			type="checkbox"
			bind:checked={System.show_intelligence}
			id="show_intelligence"
		/>
		Afficher l'intelligence totale
	</label>

	<label class="form-control" for="autoplay">
		<input type="checkbox" bind:checked={System.autoplay} id="autoplay" />
		Lance les combats automatiques
	</label>
</div>

<div class="slidecontainer">
	<label for="delay" style="transform: translate(0, 20%)">
		Vitesse des combats automatiques
	</label>
	<input
		type="range"
		min="1"
		max="4"
		bind:value={delay}
		on:change={() => {
			System.auto_speed = delay * 500;
		}}
		class="slider"
		id="delay"
	/>
	<label for="delay" style="transform: translate(0, 20%);text-align:center;">
		{delay / 2}s
	</label>
</div>

<style>
	div.slidecontainer {
		width: 50%;
		display: grid;
		grid-template-columns: 10em 10fr 3fr;
	}

	.slider {
		appearance: none;
		width: 100%;
		height: 10px;
		border-radius: 5px;
		background: var(--card);
		border: solid;
		border-color: black;
		outline: none;
		opacity: 0.7;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
		cursor: url("./assets/Pictures/Select.cur"), pointer;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: #04aa6d;
		cursor: url("./assets/Pictures/Select.cur"), pointer;
	}

	.slider::-moz-range-thumb {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: gold;
		border: solid;
		border-color: black;
		cursor: url("./assets/Pictures/Select.cur"), pointer;
	}
</style>
