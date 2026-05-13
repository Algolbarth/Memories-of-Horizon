<script lang="ts">
	import BlackScreen from "../title-screen/black-screen.svelte";
	import TitleScreen from "../title-screen/title-screen.svelte";
	import Login from "../title-screen/login.svelte";
	import Register from "../title-screen/register.svelte";
	import Menu from "../menu/menu.svelte";
	import Play from "../play/view.svelte";
	import Wild from "../play/wild.svelte";
	import Standard from "../play/standard.svelte";
	import Library from "../library/view.svelte";
	import Profil from "../profil/view.svelte";
	import Lore from "../lore/list.svelte";
	import News from "../menu/news.svelte";
	import Training from "../training/main.svelte";
	import Game from "../game/game.svelte";
	import Settings from "../settings/view.svelte";
	import Scenario from "../game/scenario.svelte";
	import Victory from "../game/victory.svelte";
	import GameOver from "../game/game-over.svelte";
	import ModeDecks from "../deck/select-mode.svelte";
	import ListDecks from "../deck/list.svelte";
	import Deck from "../deck/card-list.svelte";
	import Add from "../deck/add-card.svelte";
	import type { System } from "$lib/system/class";

	export let system: System;
</script>

{#if system.page == "BlackScreen"}
	<BlackScreen bind:system />
{:else if system.page == "TitleScreen"}
	<TitleScreen bind:system />
{:else if system.page == "Login"}
	<Login bind:system />
{:else if system.page == "Register"}
	<Register bind:system />
{:else if system.page == "Menu"}
	<Menu bind:system />
{:else if system.page == "Play"}
	<Play bind:system />
{:else if system.page == "Standard"}
	<Standard bind:system />
{:else if system.page == "Wild"}
	<Wild bind:system />
{:else if system.page == "Library"}
	<Library bind:system />
{:else if system.page == "Profil" && system.account != undefined}
	<Profil bind:system bind:account={system.account} />
{:else if system.page == "Lore"}
	<Lore bind:system />
{:else if system.page == "News"}
	<News bind:system />
{:else if system.page == "Training"}
	<Training bind:system />
{:else if system.page == "Game" && system.game != undefined}
	<Game bind:system bind:game={system.game} />
{:else if system.page == "Settings"}
	<Settings bind:system />
{:else if system.page == "Scenario" && system.game != undefined && system.game.chapter != undefined}
	<Scenario bind:system bind:chapter={system.game.chapter} />
{:else if system.page == "Victory"}
	<Victory bind:system />
{:else if system.page == "GameOver"}
	<GameOver bind:system />
{:else if system.page == "Decks"}
	<ModeDecks bind:system />
{:else if system.page == "StandardDecks"}
	<ListDecks bind:system bind:decks={system.standard_decks} mode={"Standard"} />
{:else if system.page == "WildDecks"}
	<ListDecks bind:system bind:decks={system.wild_decks} mode={"Libre"} />
{:else if system.page == "Deck" && system.deck != undefined}
	<Deck bind:system bind:deck={system.deck} />
{:else if system.page == "Add" && system.deck != undefined}
	<Add bind:system bind:deck={system.deck} />
{/if}
