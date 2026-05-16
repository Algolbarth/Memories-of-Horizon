<script lang="ts">
	import type { Story } from "./class";
	import type { System } from "$lib/system/class";
	import View from "./view.svelte";

	export let system: System;

	let story: undefined | Story = undefined;
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

<div class="zone side">
	<div id="list" class="scroll">
		{#each system.stories as s}
			{#if s.unlock}
				<div class="preview">
					<button
						on:click={() => {
							story = s;
						}}
					>
						{s.title}
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>

{#if story != undefined}
	<View bind:view={story} bind:story />
{/if}

<style>
	#list {
		height: 80vh;
	}
</style>
