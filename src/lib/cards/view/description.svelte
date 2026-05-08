<script lang="ts">
	import type { Card } from "../class/card";

	export let card: Card;
</script>

<div class="box">
	<span class="box_title">Description</span>
	<div style="text-align:center;">
		"{@html card.description()}"
	</div>
</div>
