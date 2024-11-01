<script>
	export let System;
</script>

<div id="body">
	L'histoire est arrivée à son terme
	<br /><br />
	<button
		class="big"
		on:click={() => {
			System.pages.change('Menu');
		}}>Retour à l'écran titre</button
	>
</div>

<style>
	#body {
		text-align: center;
	}
</style>
