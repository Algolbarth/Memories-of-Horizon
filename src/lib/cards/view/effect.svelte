<script lang="ts">
	import type { System } from "$lib/system/class";
	import type { Card } from "../class/card";

	export let card: Card;
	export let system: System;

	function evaluateCondition(condition: string, context: Record<string, any>) {
		try {
			return Function(...Object.keys(context), `return (${condition})`)(...Object.values(context));
		} catch {
			return false;
		}
	}

	function evaluateExpression(expr: string, context: Record<string, any>) {
		try {
			return Function(...Object.keys(context), `return (${expr})`)(...Object.values(context));
		} catch {
			return expr;
		}
	}
</script>

<div class="box">
	<span class="box_title">Effet</span>

	<br />

	{#each card.effects as effect, nb_effect}
		{#if effect.condition()}
			{#if nb_effect > 0}{#if card.effects[nb_effect - 1].type != "choice"}<br /><br />{:else}<br />{/if}{/if}

			{#each effect.lines as line, nb_line}
				{#if nb_line > 0}<br />{/if}

				{#snippet render(parts: any)}
					{#each parts as part}
						{#if part.type === "text"}
							{@html part.value}
						{/if}

						{#if part.type === "choice"}
							<ul>{@render render(part.children)}</ul>
						{/if}

						{#if part.type === "option"}
							<li>{@render render(part.children)}</li>
						{/if}

						{#if part.type === "jump"}
							<br />
						{/if}

						{#if part.type === "variable"}
							{evaluateExpression(part.value, { card: card, system: system })}
						{/if}

						{#if part.type === "if"}
							{#if evaluateCondition(part.arg, { card: card, system: system })}
								{@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "details"}
							<span class="details">{@render render(part.children)}</span>
						{/if}

						{#if part.type === "card"}
							<button
								class="active"
								on:click={() => {
									system.view.card = system.cards.getByName(evaluateExpression(part.children[0].value, { card: card, system: system }));
								}}
							>
								{@render render(part.children)}
							</button>
						{/if}

						{#if part.type === "satiety"}
							{#if system.game != undefined && card.canSatiety()}
								<span style={"color:var(--satiety_effect)"}>
									Satieté : {@render render(part.children)}
								</span>
							{:else}
								Satieté : {@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "luck"}
							{#if system.game != undefined && card.owner().nb_cards_read_turn >= part.arg}
								<span style={"color:var(--luck_effect)"}>
									Chance {part.arg} : {@render render(part.children)}
								</span>
							{:else}
								Chance {part.arg} : {@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "resolve"}
							{#if system.game != undefined && card.owner().totalIntelligence() >= part.arg}
								<span style={"color:var(--resolve_effect)"}>
									Résolution {part.arg} : {@render render(part.children)}
								</span>
							{:else}
								Résolution {part.arg} : {@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "prime" || part.type == "prime_inf"}
							{#if system.game != undefined && card.owner().ressource("Or").total() >= part.arg}
								<span style={"color:var(--prime_effect)"}>
									Prime
									{#if part.type == "prime_inf"}infinie{/if}
									{part.arg} : {@render render(part.children)}
								</span>
							{:else}
								Prime
								{#if part.type == "prime_inf"}infinie{/if}
								{part.arg} : {@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "source" || part.type == "source_inf"}
							{#if system.game != undefined && card.owner().ressource("Eau").total() >= part.arg}
								<span style={"color:var(--source_effect)"}>
									Source
									{#if part.type == "source_inf"}infinie{/if}
									{part.arg} : {@render render(part.children)}
								</span>
							{:else}
								Source {#if part.type == "source_inf"}infinie{/if}
								{part.arg} : {@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "blaze" || part.type == "blaze_inf"}
							{#if system.game != undefined && card.owner().ressource("Feu").production >= part.arg}
								<span style={"color:var(--blaze_effect)"}>
									Embrasement
									{#if part.type == "blaze_inf"}infini{/if}
									{part.arg} : {@render render(part.children)}
								</span>
							{:else}
								Embrasement
								{#if part.type == "blaze_inf"}infini{/if}
								{part.arg} : {@render render(part.children)}
							{/if}
						{/if}

						{#if part.type === "sorcery"}
							{#if system.game != undefined && card.owner().ressource("Mana").total() >= part.arg}
								<span style={"color:var(--sorcery_effect)"}>
									Sorcellerie {part.arg} : {@render render(part.children)}
								</span>
							{:else}
								Sorcellerie {part.arg} : {@render render(part.children)}
							{/if}
						{/if}
					{/each}
				{/snippet}

				{@render render(line)}
			{/each}
		{/if}
	{/each}
</div>
