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

<div style:height="3vh">
	<div on:focusout={handleDropdownFocusLoss}>
		<div>
			<button
				class="main"
				style:width={width + "vw"}
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
				style:width={width + "vw"}
				style:max-height={height + "vh"}
			>
				{#each array as element}
					<button
						on:click={() => {
							select(element);
						}}>{element}</button
					>
					<br />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.list {
		position: relative;
		background: grey;
		border: solid;
	}

	button.main {
		border: solid;
		width: 100%;
		padding: 1%;
	}

	button:hover {
		background: grey;
	}

	button:focus {
		background: grey;
	}

	button {
		text-align: center;
		margin: 0;
		padding: 1%;
		border: none;
		background: grey;
		width: 100%;
	}
</style>
