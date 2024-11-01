<script>
	export let System;
</script>

<div id="body" class="center">
	Chapitre {System.game.chapter.number} - Étape {System.game.player.step} / {System.game.chapter
		.steps.length}
	
	<br />
	<br />

	{System.game.chapter.steps[System.game.player.step - 1].dialogs[System.game.chapter.dialog]}

	<br />
	<br />

	<button
		class="big"
		on:click={() => {
			System.game.chapter.nextDialog();
		}}>Suivant</button
	>
</div>

<style>
	#body {
		text-align: center;
	}

	:global(.center) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
