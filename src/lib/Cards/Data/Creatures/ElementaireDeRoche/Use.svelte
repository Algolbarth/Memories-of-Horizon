<script>
	export let System;

	function fonction(choice) {
		System.game.use.card.useEffect(choice);
		System.game.use.reset();
	}
</script>

<div class="center" style="text-align:center">
	<button
		class="big"
		on:click={() => {
			fonction("Créature");
		}}
	>
		Se place sur le terrain
	</button>

	<br />

	<button
		class="big"
		on:click={() => {
			fonction("Effet");
		}}
	>
		Se détruis pour infliger 5 dégâts à toutes les unités adverses
	</button>
</div>
