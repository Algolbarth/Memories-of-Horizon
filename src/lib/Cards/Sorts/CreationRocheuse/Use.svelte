<script>
	export let System;
	System;

	function fonction(choice) {
		System.game.use.card.useEffect(choice);
		System.game.use.reset();
	}
</script>

<div class="center" style="text-align:center">
	<button
		class="big"
		on:click={() => {
			fonction('Créature');
		}}>Élémentaire de roche</button
	>
	<br />
	<button
		class="big"
		on:click={() => {
			fonction('Bâtiment');
		}}>Mur de roche</button
	>
</div>
