<script>
    export let unit;
    import {push,pop,replace} from "svelte-spa-router"
    import { tasks, token } from "../store"

    const unitInfo =()=>{
        push("/UnitInfo/"+unit.id)
    }
    

    
</script>


<div class="card" on:keypress on:click={unitInfo}><div class="card-body">{unit.name}</div></div>


<style>
    @font-face{
        font-family: 'Font';
        src: url("CocogooseText.ttf");
    }
div{
    margin: 5px;
} 

</style>

