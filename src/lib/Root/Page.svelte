<script>
	import BlackScreen from "../Login/BlackScreen.svelte";
	import TitleScreen from "../Login/TitleScreen.svelte";
	import Login from "../Login/Login.svelte";
	import Register from "../Login/Register.svelte";
	import Menu from "../Menu/Menu.svelte";
	import Play from "../Menu/Play.svelte";
	import Construit from "../Menu/Construit.svelte";
	import Library from "../Menu/Library.svelte";
	import Profil from "../Menu/Profil.svelte";
	import Universe from "../Menu/Universe.svelte";
	import News from "../Menu/News.svelte";
	import Training from "../Training/Main.svelte";
	import Game from "../Game/Game.svelte";
	import Settings from "../Settings/View.svelte";
	import Dialog from "../Game/Dialog.svelte";
	import Victory from "../Game/Victory.svelte";
	import GameOver from "../Game/GameOver.svelte";
	import Decks from "../Decks/List.svelte";
	import Deck from "../Decks/Deck.svelte";
	import Add from "../Decks/Add.svelte";

	export let System;
</script>

{#if System.page == "BlackScreen"}
	<BlackScreen bind:System />
{:else if System.page == "TitleScreen"}
	<TitleScreen bind:System />
{:else if System.page == "Login"}
	<Login bind:System />
{:else if System.page == "Register"}
	<Register bind:System />
{:else if System.page == "Menu"}
	<Menu bind:System />
{:else if System.page == "Play"}
	<Play bind:System />
{:else if System.page == "Construit"}
	<Construit bind:System />
{:else if System.page == "Library"}
	<Library bind:System />
{:else if System.page == "Profil"}
	<Profil bind:System />
{:else if System.page == "Universe"}
	<Universe bind:System />
{:else if System.page == "News"}
	<News bind:System />
{:else if System.page == "Training"}
	<Training bind:System />
{:else if System.page == "Game"}
	<Game bind:System />
{:else if System.page == "Settings"}
	<Settings bind:System />
{:else if System.page == "Dialog"}
	<Dialog bind:System />
{:else if System.page == "Victory"}
	<Victory bind:System />
{:else if System.page == "GameOver"}
	<GameOver bind:System />
{:else if System.page == "Decks"}
	<Decks bind:System />
{:else if System.page == "Deck"}
	<Deck bind:System />
{:else if System.page == "Add"}
	<Add bind:System />
{/if}
