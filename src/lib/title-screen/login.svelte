<script lang="ts">
	import Logo from "../menu/logo.svelte";
	import type { System } from "$lib/system/class";
	import { load } from "./load";
	import { open } from "@tauri-apps/plugin-dialog";
	import { readTextFile } from "@tauri-apps/plugin-fs";
	import { localDataDir, join } from "@tauri-apps/api/path";

	export let system: System;

	async function login() {
		const localData = await localDataDir();
		const savesPath = await join(localData, "Memories of Horizon", "Saves");

		const selected = await open({
			defaultPath: savesPath,
			multiple: false,
			filters: [{ name: "MoH", extensions: ["txt"] }],
		});

		if (selected) {
			const content = await readTextFile(selected as string);
			let log = await load(content, system);
			if (log != undefined) {
				system = log;
				system.page = "Menu";
			}
		}
	}
</script>

<div id="body">
	<Logo />

	<br />
	<br />

	<button
		class="square return"
		on:click={() => {
			system.page = "TitleScreen";
		}}
	>
		↩
	</button>

	<br />
	<br />

	<button on:click={login} class="big">Charger une sauvegarde</button>
</div>

<style>
	#body {
		text-align: center;
	}

	button.big {
		width: 15vw;
	}
</style>
