<script>
    import {units, token} from "../store"
    import Navbar from "../Navbar.svelte";
    import Unit from "../unit/Unit.svelte";
    
    getUnits()
    async function getUnits(){

        let url = "https://mini-axami-server.arvpet0320.repl.co/allWork";

        let response = await fetch(url,{
            headers:{"newtoken":$token}
        })
        let json = await response.json()
        console.log(json)
        units.set(json)
    }
    $: console.log($units)

</script>
<Navbar></Navbar>
<h2>UNITS</h2>
{#each $units as unit }
    <Unit unit={unit}/>
{/each}

<style>
    @font-face{
        font-family: 'Font';
        src: url("CocogooseText.ttf");
    }
    h2{
        font-family: 'Font';
        text-align: center;
        margin: 40px;
        font-size: 30px;
    }
</style>