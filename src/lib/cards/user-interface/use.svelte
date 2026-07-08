<script lang="ts">
	import { Choice, Target, type UserInterface } from "$lib/cards/user-interface/class";
	import type { System } from "$lib/system/class";
	import type { Game } from "../../game/class";
	import Zone from "../../game/zone.svelte";
	import View from "../view/main.svelte";

	export let system: System;
	export let game: Game;
	export let user_interface: UserInterface;

	$: panel = user_interface.panels[user_interface.selected_panel];

	function close() {
		game.user_interface = undefined;
	}
</script>

<div class="window">
	<div class="body">
		<div class="taskbar">
			<div>
				<button
					class="square close"
					on:click={() => {
						close();
					}}
				>
					X
				</button>

				{#if user_interface.selected_panel > 0}
					<button
						class="square return"
						on:click={() => {
							user_interface.selected_panel = 0;
						}}
					>
						↩
					</button>
				{/if}
			</div>

			<div>
				<button
					class="taskbar"
					on:click={() => {
						system.view.card = user_interface.card;
					}}
					on:mouseenter={() => {
						system.view.quick = user_interface.card;
					}}
					on:mouseleave={() => {
						system.view.quick = undefined;
					}}
				>
					{user_interface.card.name}
				</button>
			</div>
		</div>

		{#if panel instanceof Target}
			<div class="side">
				{#each panel.zones as zone}
					<Zone bind:system bind:game entity={zone.entity} {zone} selectCondition={panel.condition} selectAction={panel.action} />
				{/each}
			</div>
		{:else if panel instanceof Choice}
			<div class="center" style="text-align:center">
				{#each panel.choices as button}
					<button
						class="big choice"
						on:click={() => {
							button.action();
						}}
					>
						{#each button.text as line}
							{line}
							<br />
						{/each}
					</button>

					<br />
				{/each}
			</div>
		{/if}
	</div>
</div>

<div id="view">
	<View bind:system />
</div>

<style>
	button.taskbar {
		transition: background-color var(--delay) ease-in-out;

		background-color: var(--preview);
		background-image: var(--scroll);
		background-blend-mode: overlay, soft-light, soft-light, normal;
	}

	button.taskbar:hover {
		transition: background-color var(--delay_hover) ease-in-out;
		background-color: var(--preview_hover);
		color: gold;
	}

	#view {
		position: fixed;
		top: 5vh;
		left: 30vw;
	}
</style>
