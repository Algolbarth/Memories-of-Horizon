<script>
	export let System;
	export let card;
	export let condition;
	export let fonction;

	$: isPlayer = card.owner == System.game.player ? true : false;
</script>

<div
	class={(isPlayer || fonction != undefined ? 'container ' : '') +
		(card == System.game.fighter ? 'attacker ' : '') +
		'preview'}
>
	<div id={isPlayer || fonction != undefined ? 'infos' : ''}>
		{#if card.verrou}
			<div id="verrou">&#x1F512</div>
		{/if}
		{#if !card.cache}
			<button
				on:click={() => {
					System.view.card = card;
				}}
				on:mouseenter={() => {
					System.view.quick = card;
				}}
				on:mouseleave={() => {
					System.view.quick = undefined;
				}}
			>
				{card.name}
			</button>
		{:else}
			<button>???</button>
		{/if}
	</div>

	{#if isPlayer || fonction != undefined}
		<div id="actions">
			{#if System.game.phase == 'Préparation' && fonction == undefined}
				{#if card.zone.name == 'Main' || card.zone.name == 'Terrain'}
					<button
						on:click={() => {
							card.sell();
							System = System;
						}}
					>
						Vendre
					</button>
				{/if}
				{#if card.zone.name == 'Boutique'}
					<button
						on:click={() => {
							card.buy();
							System = System;
						}}
					>
						Acheter
					</button>
				{:else if card.zone.name == 'Main'}
					<button
						on:click={() => {
							card.use();
							System = System;
						}}
					>
						Poser
					</button>
				{:else if card.zone.name == 'Lieux'}
					{#if card == card.owner.place}
						Actif
					{:else}
						<button
							on:click={() => {
								card.owner.place = card;
							}}
						>
							Changer
						</button>
					{/if}
				{/if}
				{#if card.zone.name == 'Main' || (card.zone.name == 'Terrain' && card.type == 'Créature')}
					{#if card.slot > 0}
						<button
							on:click={() => {
								card.up();
								System = System;
							}}
						>
							&#9650
						</button>
					{:else}
						<button class="classic useless">&#9650</button>
					{/if}
					{#if card.slot < card.zone.cards.length - 1}
						<button
							on:click={() => {
								card.down();
								System = System;
							}}
						>
							&#9660
						</button>
					{:else}
						<button class="classic useless">&#9660</button>
					{/if}
				{/if}
			{/if}
			{#if fonction != undefined}
				{#if condition(card)}
					<button
						on:click={() => {
							fonction(card);
							System = System;
						}}
					>
						Sélectionner
					</button>
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.attacker {
		transition: all 0s ease-in-out;
		background-color: var(--attacker);
	}

	.attacker:hover {
		transition: all var(--delay_hover) ease-in-out;
		background-color: var(--attacker_hover);
	}

	.useless {
		color: lightgrey;
	}

	#infos {
		text-align: left;
	}

	#actions {
		text-align: right;
	}

	#verrou {
		display: inline-block;
		font-size: small;
	}
</style>
