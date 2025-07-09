<script lang="ts">
	export let System: any;

	function close() {
		if (System.game == undefined) {
			System.page = "Menu";
		} else {
			System.page = "Game";
		}
	}

	let delay = System.settings.auto_speed / 500;
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
	<label for="volume"> Musique </label>
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
	<label for="volume" style="text-align:center;">
		{System.music.volume}%
	</label>
</div>

<br />

<div class="checkbox-container">
	<label class="form-control" for="show_intelligence">
		<input
			type="checkbox"
			bind:checked={System.settings.show_intelligence}
			id="show_intelligence"
		/>
		Afficher l'intelligence totale
	</label>

	<label class="form-control" for="autoplay">
		<input type="checkbox" bind:checked={System.settings.autoplay} id="autoplay" />
		Lance les combats automatiques
	</label>
</div>

<br />

<div class="slidecontainer">
	<label for="delay"> Vitesse des combats automatiques </label>
	<div>
		<input
			type="range"
			min="1"
			max="4"
			bind:value={delay}
			on:change={() => {
				System.settings.auto_speed = delay * 500;
			}}
			class="slider"
			id="delay"
		/>
	</div>
	<label for="delay" style="text-align:center;">
		{delay / 2}s
	</label>
</div>

<style>
	div.slidecontainer {
		width: 50%;
		display: grid;
		grid-template-columns: 17em 10fr 3fr;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 10px;
		padding: 0;
		border-radius: 5px;
		background: var(--card);
		border: solid;
		border-color: black;
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
		cursor: url("../../assets/Pictures/Select.cur"), pointer;
		transform: translateY(50%);
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: gold;
		border: solid;
		border-color: black;
		cursor: url("../../assets/Pictures/Select.cur"), pointer;
	}

	.slider::-moz-range-thumb {
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background: gold;
		border: solid;
		border-color: black;
		cursor: url("../../assets/Pictures/Select.cur"), pointer;
	}
</style>
