<script>
    import {token} from "../store"
    import {push,pop,replace} from "svelte-spa-router"
    import CreateComment from "./CreateComment.svelte";
    export let task;
    let count = 0;
    let info = ""
    function test(){
        
        if(count==1){
            count-=1
        }
        else
            count+=1
            

        console.log(count)
    }
    function onClicked(){
        push("/TaskInfo/"+task.id)
    }
       
</script>
<div class="card">
    {#if task.active==1}
        <div class="card-body fs-5 active" on:keypress on:click={onClicked}>{task.title}</div>
    {:else}
        <div class="card-body fs-5 notActive" on:keypress on:click={onClicked}>{task.title}</div>
    {/if}
</div>

<style>

.card{
    margin: 10px;
}
.active{
    border: 1px solid red;
    border-radius: 8px;
}
.notActive{
    border: 1px solid green;
    border-radius: 8px;
}

</style>