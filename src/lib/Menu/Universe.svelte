<script>
	export let System;

	let story = undefined;
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

<div id="zone">
	<div id="list" class="scroll">
		{#each System.stories as s}
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
	<div class="window">
		<div class="body">
			<button
				class="close"
				on:click={() => {
					story = undefined;
				}}
			>
				X
			</button>

			<br />
			<br />

			<div id="story" class="scroll">
				<div id="text" class="parchment">
					<div class="title">{story.title}</div>

					<br />
					<br />
					<br />

					<hr />

					<div id="space"></div>

					<svelte:component this={story.text} />
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	#zone {
		background-color: var(--zone);
		border: solid;
		margin: 1%;
		padding: 1%;
		width: 50vw;
	}

	#list {
		max-height: 80vh;
	}

	#story {
		position: fixed;
		top: 0;
		height: 100vh;
		margin-left: 27vw;
		width: 46vw;
		text-align: justify;
		box-shadow:
			inset 0px 25px 10px -15px rgba(0, 0, 0, 0.5),
			inset 0px -25px 10px -15px black;
	}

	#text {
		padding: 3vw;
		padding-top: 40vh;
		padding-bottom: 25%;
	}

	.parchment {
		box-shadow:
			2px 3px 20px black,
			0 0 60px #8a4d0f inset;
		background: var(--story);
		filter: url(#wavy2);
	}

	#space {
		height: 40vh;
	}

	div.title {
		text-align: center;
		font-size: 2em;
	}

	hr {
		overflow: visible;
		padding: 0;
		border: none;
		border-top: medium double black;
		border-width: 0.5em;
		text-align: center;
		box-shadow: inset 0 1em 1em -1em rgba(0, 0, 0, 0.3);
	}

	hr:after {
		content: "§";
		display: inline-block;
		position: relative;
		top: -0.9em;
		font-size: 1.5em;
		padding: 0 0.25em;
		background: var(--story);
	}

	.window {
		background: var(--shadow);
	}
</style>
