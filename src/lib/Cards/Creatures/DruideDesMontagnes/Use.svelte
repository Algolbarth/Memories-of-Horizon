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
			fonction('Nain');
		}}>Forme nain</button
	>

	<br />

	<button
		class="big"
		on:click={() => {
			fonction('Ours');
		}}>Forme ours</button
	>
</div>
