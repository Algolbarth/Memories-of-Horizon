<script lang="ts">
	import type { Card } from "$lib/cards/class/card";
	import { Location } from "$lib/cards/class/location";
	import type { System } from "$lib/system/class";
	import type { Game } from "./class";

	export let system: System;
	export let game: Game;
	export let card: Card;
	export let selectCondition: Function | undefined;
	export let selectAction: Function | undefined;
</script>

<div class={(card.owner().is_player || selectAction != undefined ? "container " : "") + (card == game.fighter ? "attacker " : "") + "preview"}>
	<div id={card.owner().is_player || selectAction != undefined ? "infos" : ""}>
		{#if card.locked}
			<img src="/pictures/lock.svg" alt="locked" class="locked" />
		{/if}
		{#if !card.cache}
			<button
				on:click={() => {
					system.view.card = card;
				}}
				on:mouseenter={() => {
					system.view.quick = card;
				}}
				on:mouseleave={() => {
					system.view.quick = undefined;
				}}
			>
				{card.name}
			</button>
		{:else}
			<button>???</button>
		{/if}
	</div>

	{#if card.owner().is_player || selectAction != undefined}
		<div id="actions">
			{#if game.phase == "Préparation" && selectAction == undefined}
				{#if card.isArea("Inventaire") || card.isArea("Terrain")}
					<button
						class="active"
						on:click={() => {
							card.sell();
							system = system;
						}}
					>
						Vendre
					</button>
				{/if}

				{#if card.isArea("Pile")}
					{#if card.canBuy()}
						<button
							class="active"
							on:click={() => {
								card.buy();
								system = system;
							}}
						>
							Acheter
						</button>
					{:else}
						Acheter
					{/if}
				{:else if card.isArea("Inventaire")}
					{#if card.canUse()}
						<button
							class="active"
							on:click={() => {
								card.use();
								system = system;
							}}
						>
							Poser
						</button>
					{:else}
						Poser
					{/if}
				{:else if card.isArea("Région")}
					{#if card == card.owner().place}
						<span>Actif</span>
					{:else if card.owner().ressource("Or").total() >= 5}
						<button
							class="active"
							on:click={() => {
								if (card instanceof Location) {
									card.owner().place = card;
									card.owner().ressource("Or").spend(5);
								}
							}}
						>
							Changer
						</button>
					{:else}
						<button>Changer</button>
					{/if}
				{/if}
			{/if}

			{#if selectAction != undefined && selectCondition != undefined}
				{#if selectCondition(card)}
					<button
						class="active"
						on:click={() => {
							selectAction(card);
							system = system;
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

	#infos {
		text-align: left;
	}

	#actions {
		text-align: right;
	}

	img.locked {
		width: 1em;
		transform: translate(0, 10%);
	}
</style>
