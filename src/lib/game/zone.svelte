<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Entity } from "./entity";
	import type { Game } from "./class";
	import Preview from "./preview.svelte";
	import { Stack } from "./stack";
	import type { Zone } from "./zone";
	import { Creature } from "$lib/cards/class/creature";

	export let system: System;
	export let game: Game;
	export let zone: Zone;
	export let entity: Entity;
	export let selectCondition: Function | undefined;
	export let selectAction: Function | undefined;
	export let direction: string = "left";

	let dragging_index: number | null = null;
	let drag_over_index: number | null = null;

	$: can_deplace = (card: any) => game.phase == "Préparation" && selectAction == undefined && (card.isArea("Inventaire") || (card.isArea("Terrain") && card instanceof Creature));

	function onDragStart(index: number) {
		dragging_index = index;
	}

	function onDragOver(event: DragEvent, index: number) {
		if (dragging_index != null) {
			event.preventDefault();
			drag_over_index = index;
		}
	}

	function onDrop(index: number) {
		if (dragging_index != null && dragging_index != index) {
			const updated = [...zone.cards];
			const [moved] = updated.splice(dragging_index, 1);
			updated.splice(index, 0, moved);
			zone.cards = updated;
			system = system;
		}

		dragging_index = null;
		drag_over_index = null;
	}

	function onDragEnd() {
		dragging_index = null;
		drag_over_index = null;
	}
</script>

{#if system.game}
	<div class={"zone " + direction}>
		<div class="zone_taskbar">
			<div class="infos">
				<div>
					{zone.name}
				</div>

				<div>
					{#if zone.name != "Défausse"}
						({zone.cards.length} / {zone.size})
					{:else}
						({zone.cards.length} / ∞)
					{/if}
				</div>

				<div>
					{#if zone instanceof Stack}
						Nv {zone.level()}
					{/if}
				</div>
			</div>

			<div style="text-align:right;">
				{#if zone instanceof Stack}
					{#if entity.is_player && zone.level() < 20 && selectAction == undefined && system.game.phase == "Préparation"}
						{#if entity.canUpStack()}
							<button
								class="active"
								on:click={() => {
									entity.upStack();
									system = system;
								}}
							>
								Améliorer
							</button>
						{:else}
							Améliorer
						{/if}
						{zone.level() * 10} Or -
					{/if}

					{#if entity.is_player && selectAction == undefined && system.game.phase == "Préparation"}
						{#if entity.canActualiseStack()}
							<button
								class="active"
								on:click={() => {
									entity.actualiseStack();
									system = system;
								}}
							>
								Actualiser
							</button>
						{:else}
							Actualiser
						{/if}
						{10} Or
					{/if}

					{#if entity.is_player && selectAction == undefined && system.game.phase == "Préparation"}
						-
						<button
							class="active"
							on:click={() => {
								entity.lock();
								system = system;
							}}
						>
							{#if entity.isFullLocked()}
								Déverrouiller
							{:else}
								Verrouiller
							{/if}
						</button>
					{/if}
				{:else if zone.name == "Région" && entity.is_player}
					5 Or pour changer de lieu actif
				{/if}
			</div>
		</div>

		<div id="list">
			{#if zone.cards.length > 0}
				{#each zone.cards as card, index}
					<div role="listitem" draggable={can_deplace(card)} on:dragstart={() => can_deplace(card) && onDragStart(index)} on:dragover={(e) => can_deplace(card) && onDragOver(e, index)} on:drop={() => can_deplace(card) && onDrop(index)} on:dragend={onDragEnd} class:dragging={dragging_index === index} class:drag-over={drag_over_index === index && dragging_index !== index}>
						<Preview bind:system bind:game bind:card bind:selectCondition bind:selectAction />
					</div>
				{/each}
			{:else}
				Vide
				<br />
			{/if}
		</div>
	</div>
{/if}

<style>
	div.zone {
		margin-bottom: 1vw;
	}

	div.left {
		margin-right: 0.5vw;
	}

	div.right {
		margin-left: 0.5vw;
	}

	div.zone_taskbar {
		grid-template-columns: 1fr 2fr;
		text-align: left;
	}

	div.infos {
		display: grid;
		grid-template-columns: 4.5em 1fr 4em;
	}

	div.dragging {
		opacity: 0.4;
	}

	div.drag-over {
		outline: 2px dashed currentColor;
		outline-offset: -3px;
	}
</style>
