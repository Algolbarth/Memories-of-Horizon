<script>
	export let array = [];
	export let selected;
	export let selecting = function () {};
	export let height = 25;
	export let width = 15;

	let isDropdownOpen = false;

	const handleDropdownClick = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
		if (
			relatedTarget instanceof HTMLElement &&
			currentTarget.contains(relatedTarget)
		)
			return;
		isDropdownOpen = false;
	};

	function select(element) {
		selecting(element);
		selected = element;
		isDropdownOpen = false;
	}
</script>

<div style:height="1.4em" style:width={width + "vw"}>
	<div on:focusout={handleDropdownFocusLoss} class="container">
		<div>
			<button
				class="main"
				on:click={handleDropdownClick}
			>
				{#if selected != undefined}
					{selected}
				{:else}
					Liste
				{/if}
			</button>
		</div>

		{#if isDropdownOpen}
			<div
				class="list scroll"
				style:max-height={height + "vh"}
			>
				{#each array as element}
					<button
						class="element"
						on:click={() => {
							select(element);
						}}
					>
						{element}
					</button>
					<br />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	div.container {
		width: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	button.main {
		border: solid;
		padding: 0.2em 1.2em;
	}

	button:hover {
		background: grey;
	}

	button:focus {
		background: grey;
	}

	div.list {
		position: relative;
		background: grey;
		border: solid;
		border-radius: 5px;
		z-index: 1;
	}

	button {
		text-align: center;
		margin: 0;
		border: none;
		background: grey;
		width: 100%;
	}
</style>
