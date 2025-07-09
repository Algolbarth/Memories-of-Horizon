<script>
	export let System;

	let name = System.account.name;
</script>

<button
	class="close"
	on:click={() => {
		System.page = "Menu";
	}}
>
	X
</button>

<br />
<br />

<input type="text" bind:value={name} />
{#if name != System.account.name}
	<button
		on:click={() => {
			System.account.name = name;
		}}
	>
		Renommer
	</button>
{/if}

<br /><br />

Total des parties : {System.account.matchs()}
<br />
Victoires : {System.account.victory()}
<br />
Défaites : {System.account.defeat()}

<br /><br />

Mode aventure : {System.account.aventure.total()}
<br />
Victoires : {System.account.aventure.victory}
<br />
Défaites : {System.account.aventure.defeat}

<br /><br />

Mode construit : {System.account.construct.total()}
<br />
Victoires : {System.account.construct.victory}
<br />
Défaites : {System.account.construct.defeat}
