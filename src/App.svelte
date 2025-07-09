<script>
  import Root from "./lib/Root/Page.svelte";
  import { System as Sys } from './lib/System/Class';

  let System = new Sys();
  System.music.init();
  System.page = "BlackScreen";
</script>

<div class="window">
  <div class="body">
    <Root bind:System />
  </div>
</div>
