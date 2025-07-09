<script>
	import Caracteristics from './Caracteristics.svelte';
	import Description from './Description.svelte';
	import Effet from './Effet.svelte';
	import Equipments from './Equipments.svelte';
	import Stat from './Stat.svelte';
	import Trait from './Trait.svelte';

	export let System;

	$: card = System.view.quick == undefined ? System.view.card : System.view.quick;

	function close() {
		System.view.card = undefined;
		System = System;
	}
</script>

{#if card != undefined}
	<div id="shadow">
		<div id="body">
			<div id="content">
				<div style="text-align:right;">
					<button
						class="close"
						on:click={() => {
							close();
						}}
					>
						X
					</button>
				</div>
				<Caracteristics bind:card />
				{#if card.text != undefined}
					<Effet bind:card bind:System />
				{/if}
				{#if card.hasTrait()}
					<Trait bind:card />
				{/if}
				{#if card.hasStat()}
					<Stat bind:card />
				{/if}
				{#if card.familles.total().includes('Équipement')}
					<div class="box">
						<i>Statistiques</i>

						<br />

						{#each card.equipStats as e}
							{#if e.value() > 0}
								{e.name} : {e.value()}

								<br />
							{/if}
						{/each}
					</div>
				{/if}
				{#if card.type == 'Créature'}
					<Equipments bind:card bind:System />
				{/if}

				<br />

				<Description bind:card />
			</div>
		</div>
	</div>
{/if}

<style>
	#shadow {
		width: 40vw;
		height: 90vh;
		margin: 2.5vh;
	}

	#shadow::before {
		content: '';
		position: absolute;
		z-index: -1;
		width: 40vw;
		height: 90vh;
		border: solid;
		border-width: 10px;
		border-radius: 20px;
		box-shadow: 0px 15px 15px rgba(0, 0, 0, 1);
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	#shadow:hover::before {
		transition: opacity 0.5s ease-in-out;
		opacity: 1;
	}

	#body {
		position: relative;
		display: inline-block;
		border: solid;
		border-width: 10px;
		border-radius: 20px;
		width: 100%;
		height: 100%;
		background-color: var(--card);
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 1);
		transition: all 0.5s ease-in-out;
	}

	#body:hover {
		transition: all 1s ease-in-out;
		box-shadow: none;
	}

	#content {
		padding: 2%;
	}
</style>
