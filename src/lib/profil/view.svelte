<script lang="ts">
	import type { Account } from "./account";
	import type { System } from "$lib/system/class";
	import { several } from "../utils";
	import Time from "./time.svelte";

	export let system: System;
	export let account: Account;

	let name: string = account.name;
	$: play_time = account.play_time;
	$: session_time = account.session_time;
	$: best_session_time = account.best_session_time;
	$: ingame_time = account.ingame_time;

	function rename() {
		account.name = name;
	}
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
		<button class="taskbar">Profil</button>
	</div>
</div>

<div class="zone">
	<input type="text" bind:value={name} />
	{#if name != account.name}
		<button on:click={rename}> Renommer </button>
	{/if}

	<br />
	<br />

	<div class="container">
		<div>
			Temps de jeu total :
			<Time bind:time={play_time} />
		</div>

		<div>
			Temps de jeu en partie:
			<Time bind:time={ingame_time} />
		</div>

		<div></div>
	</div>

	<div class="container">
		<div>
			Temps de session :
			<Time bind:time={session_time} />
		</div>

		<div>
			{#if best_session_time != undefined && best_session_time > 0}
				Session la plus longue :
				<Time bind:time={best_session_time} />
			{/if}
		</div>

		<div></div>
	</div>
</div>

<div class="zone container">
	<div>
		Total de parties : {account.totalGame()}
		<br />
		{several(account.totalVictory(), ["Victoire"], "after")}
		<br />
		{several(account.totalDefeat(), ["Défaite"], "after")}
	</div>

	<div>
		Mode Standard : {account.standard.total()}
		<br />
		{several(account.standard.victory, ["Victoire"], "after")}
		<br />
		{several(account.standard.defeat, ["Défaite"], "after")}
	</div>

	<div>
		Mode Libre : {account.wild.total()}
		<br />
		{several(account.wild.victory, ["Victoire"], "after")}
		<br />
		{several(account.wild.defeat, ["Défaite"], "after")}
	</div>
</div>

<style>
	div.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}

	div.zone {
		margin-bottom: 1vw;
	}
</style>
