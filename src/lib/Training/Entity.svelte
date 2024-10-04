<script>
    export let entity;

    let life = entity.life;
    let gold = entity.gold;
    let flux = entity.flux;
</script>

<div class="zone">
    <div class="container">
        <div>
            Vie :
        </div>
        <div>
            <input
                type="number"
                min="1"
                bind:value={life}
                on:change={() => {
                    if (life < 1) {
                        life = 1;
                    }
                    else {
                        entity.life = life;
                    }
                }}
            />
        </div>
    </div>
    <div class="container">
        <div>
            Or :
        </div>
        <div>
            <input
                type="number"
                min="0"
                bind:value={gold}
                on:change={() => {
                    if (gold < 1) {
                        gold = 1;
                    }
                    else {
                        entity.gold = gold;
                    }
                }}
            />
        </div>
    </div>
    <div class="container">
        <div>
            Flux :
        </div>
        <div>
            <input
                type="number"
                min="0"
                bind:value={flux}
                on:change={() => {
                    if (flux < 1) {
                        flux = 1;
                    }
                    else {
                        entity.flux = flux;
                    }
                }}
            />
        </div>
    </div>
</div>

<style>
    .zone {
        background-color: var(--zone);
        border: solid;
        margin: 1%;
        padding: 1%;
    }

    .container {
        display:grid;
        grid-template-columns: 0.15fr 1fr;
    }

    input[type="number"] {
        width:4em;
    }
</style>