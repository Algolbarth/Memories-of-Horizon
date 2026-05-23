<script lang="ts">
	import type { Story } from "./class";
	import type { System } from "$lib/system/class";
	import View from "./view.svelte";
	import Preview from "./preview.svelte";

	export let system: System;

	let view: undefined | Story = undefined;
</script>

<div class="taskbar">
	<div>
		<button
			class="square close"
			on:click={() => {
				system.page = "Menu";
			}}
		>
			X
		</button>
	</div>

	<div>
		<button class="taskbar">Histoires</button>
	</div>
</div>

<div class="zone">
	<div id="list" class="scroll">
		{#each system.stories as story}
			{#if story.unlock}
				<Preview bind:story bind:view />
			{/if}
		{/each}
	</div>
</div>

{#if view != undefined}
	<View bind:story={view} bind:view />
{/if}

<style>
	div#list {
		height: 80vh;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, calc(80vh / 3));
		grid-auto-rows: calc(80vh / 3);
		overflow-y: auto;
		scroll-snap-type: y mandatory;
	}
</style>
