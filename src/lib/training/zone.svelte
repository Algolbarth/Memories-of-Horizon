<script lang="ts">
	import type { System } from "../system/class";
	import type { TrainZone } from "./train";

	export let system: System;
	export let zone: TrainZone;
	export let is_bot: boolean;

	let level: number = zone.level!;
	let size: number = zone.size!;
</script>

<div class={"zone " + (is_bot ? "right" : "left")}>
	<div class="zone_taskbar">
		<div class="infos">
			<div>
				{zone.name}
			</div>

			<div>
				{#if zone.name != "Défausse"}
					({zone.cards.length} /
					<input
						type="number"
						min="1"
						max="999"
						bind:value={size}
						on:change={() => {
							if (size < 1) {
								size = 1;
							} else {
								zone.size = size;
							}
						}}
					/>)
				{:else}
					({zone.cards.length} / ∞)
				{/if}
			</div>

			<div>
				{#if zone.name == "Pile"}
					Nv
					<input
						type="number"
						min="1"
						max="20"
						bind:value={level}
						on:change={() => {
							if (level < 1) {
								level = 1;
							} else if (level > 20) {
								level = 20;
							} else {
								zone.level = level;
							}
						}}
					/>
				{/if}
			</div>
		</div>

		<div style="text-align:right;">
			{#if zone.size == undefined || zone.cards.length < zone.size}
				<button
					class="active"
					on:click={() => {
						system.view.reset();
						system.train.add.is_bot = is_bot;
						system.train.add.zone = zone;
					}}
				>
					Ajouter une carte
				</button>
			{/if}
		</div>
	</div>

	{#each zone.cards as card, i}
		<div class="preview">
			{#if !is_bot}
				<div>
					<button
						on:click={() => {
							system.view.card = system.cards.getByName(card);
						}}
						on:mouseenter={() => {
							system.view.quick = system.cards.getByName(card);
						}}
						on:mouseleave={() => {
							system.view.quick = undefined;
						}}
					>
						{card}
					</button>
				</div>

				<div style="text-align:right;">
					{#if zone.name != "Région" || zone.cards.length > 1}
						<button
							class="remove"
							on:click={() => {
								zone.cards.splice(i, 1);
								system = system;
							}}
						>
							Enlever
						</button>
					{/if}

					{#if i > 0}
						<button
							class="active"
							on:click={() => {
								let temp = zone.cards[i - 1];
								zone.cards[i - 1] = card;
								zone.cards[i] = temp;
							}}
						>
							&#9650
						</button>
					{:else}
						<button class="desactivate">&#9650</button>
					{/if}
					{#if i < zone.cards.length - 1}
						<button
							class="active"
							on:click={() => {
								let temp = zone.cards[i + 1];
								zone.cards[i + 1] = card;
								zone.cards[i] = temp;
							}}
						>
							&#9660
						</button>
					{:else}
						<button class="desactivate">&#9660</button>
					{/if}
				</div>
			{:else}
				<div>
					{#if i > 0}
						<button
							class="active"
							on:click={() => {
								let temp = zone.cards[i - 1];
								zone.cards[i - 1] = card;
								zone.cards[i] = temp;
							}}
						>
							&#9650
						</button>
					{:else}
						<button class="desactivate">&#9650</button>
					{/if}
					{#if i < zone.cards.length - 1}
						<button
							class="active"
							on:click={() => {
								let temp = zone.cards[i + 1];
								zone.cards[i + 1] = card;
								zone.cards[i] = temp;
							}}
						>
							&#9660
						</button>
					{:else}
						<button class="desactivate">&#9660</button>
					{/if}

					{#if zone.name != "Région" || zone.cards.length > 1}
						<button
							class="remove"
							on:click={() => {
								zone.cards.splice(i, 1);
								system = system;
							}}
						>
							Enlever
						</button>
					{/if}
				</div>

				<div style="text-align:right;">
					<button
						on:click={() => {
							system.view.card = system.cards.getByName(card);
						}}
						on:mouseenter={() => {
							system.view.quick = system.cards.getByName(card);
						}}
						on:mouseleave={() => {
							system.view.quick = undefined;
						}}
					>
						{card}
					</button>
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.zone {
		margin-bottom: 1vw;
	}

	.left {
		margin-right: 0.5vw;
	}

	.right {
		margin-left: 0.5vw;
	}

	div.infos {
		display: grid;
		grid-template-columns: 4.5em 1fr 4em;
	}

	div.preview {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.remove {
		color: var(--close_hover);
	}

	.remove:hover {
		color: var(--close);
	}

	div.zone_taskbar {
		grid-template-columns: 1fr 2fr;
		text-align: left;
	}
</style>
