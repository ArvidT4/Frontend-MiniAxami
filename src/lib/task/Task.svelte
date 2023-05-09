<script>
    import {token} from "../store"
    import {push,pop,replace} from "svelte-spa-router"
    import CreateComment from "./CreateComment.svelte";
    export let task;
    let count = 0;
    let info = ""
    let t = JSON.parse(atob($token.split(".")[1]))
    
    //$:console.log(task)
    function onClicked(){
        push("/TaskInfo/"+task.id)
    }
       
</script>
<div class="card">
    {#if task.worker==t.name}
        {#if task.active==1}
            <div class="card-body fs-5 active bg-primary-subtle" on:keypress on:click={onClicked}>{task.title}</div>
        {:else}
            <div class="card-body fs-5 notActive bg-primary-subtle" on:keypress on:click={onClicked}>{task.title}</div>
        {/if}
    {:else if task.worker==""}
        {#if task.active==1}
            <div class="card-body fs-5 active bg-success-subtle" on:keypress on:click={onClicked}>{task.title}</div>
        {:else if task.active==0}
            <div class="card-body fs-5 notActive bg-success-subtle" on:keypress on:click={onClicked}>{task.title}</div>
        {/if}
    {:else}
        {#if task.active==1}
            <div class="card-body fs-5 active bg-danger-subtle" on:keypress on:click={onClicked}>{task.title}</div>
        {:else if task.active==0}
            <div class="card-body fs-5 notActive bg-danger-subtle" on:keypress on:click={onClicked}>{task.title}</div>
        {/if}
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