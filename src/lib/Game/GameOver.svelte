<script>
	export let System;
</script>

<div id="body">
	L'histoire s'arrête ici...

	<br /><br />

	<button
		class="big"
		on:click={() => {
			System.page = "Menu";
		}}
	>
		Retour à l'écran titre
	</button>
</div>

<style>
	#body {
		text-align: center;
	}
</style>
