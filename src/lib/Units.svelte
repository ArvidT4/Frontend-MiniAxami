<script>
    import Unit from "./unit/Unit.svelte";
    import {units, token, worker} from "./store"
    import Navbar from "./Navbar.svelte";
    import { push } from "svelte-spa-router";

    
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
        //console.log(json)
        if(json.mes=="jwt expired"){
            localStorage.clear()
            return push("/loginuser")
        }
        units.set(json)
        load = true;
    }


</script>
<Navbar></Navbar>
<h2>YOUR UNITS</h2>
 
{#if $units.length==0}
    <div class="container text-center">
        <div class="row">
            <div class="col">
                {#if $worker}
                    <h5>You have no work at the moment</h5>
                {:else}
                    <h5>You have no units, would you like to <a href="/#/CreateUnit">create one?</a></h5>
                {/if}

            </div>
        </div>
    </div>
{:else}
    {#each $units as unit}
        <Unit unit={unit}></Unit>
    {/each}
{/if}



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