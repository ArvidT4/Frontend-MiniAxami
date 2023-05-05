<script>
    import Unit from "./unit/Unit.svelte";
    import {units, token, worker} from "./store"
    import Navbar from "./Navbar.svelte";
    import {push} from "svelte-spa-router"
    import Atob from "./Atob.svelte";
    
    
    let url;
    let load = false;
    getUnits()
    async function getUnits(){

        if($worker){
            url = "https://mini-axami-server.arvpet0320.repl.co/allWork";
        }
        else{
            url = "https://mini-axami-server.arvpet0320.repl.co/allUnits";
        }
        

        let response = await fetch(url,{
            headers:{"newtoken":$token}
        })
        let json = await response.json()
        units.set(json)
        load = true;
    }


</script>
<Atob></Atob>
<Navbar></Navbar>
<h2>YOUR UNITS</h2>
 
{#each $units as unit}
<Unit unit={unit}></Unit>
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