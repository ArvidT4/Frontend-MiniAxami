<script>
    export let params = {}
    import Navbar from "../Navbar.svelte";
    import {tasks,token, worker} from "../store"
    import CreateComment from "./CreateComment.svelte";
    import Prio from "./Prio.svelte";
    import DeleteTask from "./DeleteTask.svelte";
    let id = params.id
    
    //console.log($tasks)
    let task;
    let comments;
    let activeCount;
    let color;
    let priority;
    tasks.subscribe(t=>{
        task = t.find(t=>t.id==id);
        if(!task) return;
        comments = JSON.parse(task.comment)
        activeCount = task.active
        priority = task.priority
    })

    //console.log(task)
    async function finishTask(){
        

        let url = "https://mini-axami-server.arvpet0320.repl.co/finishTask/"+task.id;

        let response = await fetch(url,{
            headers:{"newtoken":$token}
        })
        let json = await response.json()
        //console.log(json.message.active)
        activeCount = json.message.active;
        //console.log(task.active)
    }

    if(priority==1){
        color="green"
    }
    else if(priority==2){
        color="greenyellow"
    }
    else if(priority==3){
        color="yellow"
    }
    else if(priority==4){
        color="orange"
    }
    else color="red"
</script>
<Navbar></Navbar>
{#if task}
<div class="container px-4 text-center">
    {#if activeCount==1}
    <div class="row gx-3 justify-content-end ">
        {#if !$worker}
        <div class="col">
            
            <DeleteTask task={task.id}></DeleteTask>
            
        </div>
        <div class="col-5 rounded">
            <div class="koll p-3 rounded border" on:keypress on:click={finishTask}> Finish task</div>
        </div>
        {:else}
        <div class="col rounded ">
            <div class="koll p-1 rounded border" on:keypress on:click={finishTask}><h5>Finish task</h5></div>
        </div>
        {/if}
    </div>
    {:else}
    <div class="row gx-3 justify-content-end">
        {#if !$worker}
        <div class="col">
            
            <DeleteTask task={task.id}></DeleteTask>
            
        </div>
        <div class="col-5">
            <div class="koll p-3 rounded border" on:keypress on:click={finishTask}>Open task</div>
        </div>
        {:else}
        <div class="col rounded ">
            <div class="koll p-1 rounded border" on:keypress on:click={finishTask}><h5>Open task</h5></div>
        </div>
        {/if}

    </div>
    {/if}
    <div class="row gx-3">
        <div class="col">
            <div class="koll p-2 rounded border fs-2">{task.title}</div>
        </div>
    </div>

    <div class="row gx-3">
        <div class="col-7">
            <div class="p-3 koll rounded border"><p>Deadline</p>{task.deadline}</div>
        </div>
        <div class="col-5">
            <div class="p-2 koll rounded border"><p>Priority</p><Prio backgroundColor={color}></Prio></div>
        </div>
    </div>
    <div class="row rounded">
        <div class="col rounded ">
            <div class="koll p-2 rounded border fs-4">Comments</div>
            <div class="koll rounded"><CreateComment task={task.id}></CreateComment></div>
        </div>
    </div>
    <div class="row gx-3">
        <div class="col">
            {#each comments as comment}
                <div class="koll p-2 rounded border text-start">
                    {#if comment.date}
                    <p class="datum">{comment.date.date1} {comment.date.date2}</p>
                    {/if}
                    {comment.name}: {comment.comment}
                </div>
            {/each}
        </div>
    </div> 
</div>
{/if}

<style>
    .koll{
        /* border: 1px solid black; */
        background-color: white;
        margin: 5px;
    }
    .datum{
        margin: 0px;
    }
    h5{
        margin: 10px;
    }
    .container{
        margin-top: 50px;
    }
</style>