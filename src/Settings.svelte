<script>
    export let System;

    function close () {
        if (System.game == undefined) {
            System.pages.change("Menu");
        }
        else {
            System.pages.change("Game");
        }
    }
</script>

<button
    class="close"
    on:click={() => {
        close();
    }}>X</button
>
<br/>