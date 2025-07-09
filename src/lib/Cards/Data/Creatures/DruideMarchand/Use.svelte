<script>
	export let System;

	function fonction(choice) {
		System.game.use.card.useEffect(choice);
		System.game.use.reset();
		System = System;
	}
</script>

<div class="center" style="text-align:center">
	<button
		class="big"
		on:click={() => {
			fonction("Humain");
		}}>Forme humain</button
	>

	<br />

	<button
		class="big"
		on:click={() => {
			fonction("Boeuf");
		}}>Forme boeuf</button
	>
</div>
