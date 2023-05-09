<script>


    export let params = {}
    import Navbar from "../Navbar.svelte";
    import {tasks,token, worker, activeCount} from "../store"
    import CreateComment from "./CreateComment.svelte";
    import Prio from "./Prio.svelte";
    import DeleteTask from "./DeleteTask.svelte";
    import Modal from "./Modals/Modal.svelte";
    import ModalFinish from "./Modals/ModalFinish.svelte";
    import { pop, push } from "svelte-spa-router";
    let id = params.id
    let showModal = false;
    let showModalFinish = false;
    //console.log($tasks)
    let task;
    let comments;
    let color;
    let priority;
    tasks.subscribe(t=>{
        task = t.find(t=>t.id==id);
        if(!task) return;
        comments = JSON.parse(task.comment)
        activeCount.set(task.active) 
        priority = task.priority
    })
    let t = JSON.parse(atob($token.split(".")[1]))
    $:console.log(t)
    console.log(task)
    let price;
    let workerDeadline = (new Date()).toJSON().slice(0, 10);
    async function claimTask(){
        let url = "https://mini-axami-server.arvpet0320.repl.co/updateWorker/"+task.id;

        let response = await fetch(url,{
            method:'PUT',
            headers:{"newtoken":$token,
            "Content-Type":"application/json"},
            body: JSON.stringify({
                "price":task.price,
                "workerDeadline":task.workerDeadline
            })
        })
        let json = await response.json()
        //console.log(json)
        task = json
    }
    //$:console.log(task.worker)
    //console.log(task)
    let taken = false;
    async function finishTask(){
        if(t.name==task.worker||!$worker){
            let url = "https://mini-axami-server.arvpet0320.repl.co/finishTask/"+task.id;

            let response = await fetch(url,{
                method: 'POST',
                headers:{"newtoken":$token,
                "Content-Type":"application/json"
            },
                body: JSON.stringify({
                    "price":1000,
                    "workerDeadline":"not worker"
                })
            })
            let json = await response.json()
            task = json
            console.log(task)

            activeCount.set(task.active);
            //console.log(activeCount)
        }
        else{
            taken = true;
        }
        
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

    function back(){
        pop()
    }
    function editTask(){
        push("/TaskInfo/"+id+"/EditTask/"+task.title)
    }
</script>
<Navbar></Navbar>


<Modal bind:showModal bind:task></Modal>
<ModalFinish bind:showModalFinish bind:task></ModalFinish>
{#if task}
<div class="container px-4 text-center">

    <div class="row gx-3">
        <div class="col-3">
            <div class="koll p-2  backBtn rounded border fs-2" on:keypress on:click={back}><i class="bi bi-arrow-left"></i></div>
        </div>
        <div class="col-9">
            <div class="koll p-2 rounded border fs-2">{task.title}</div>
        </div>
    </div>

   
    {#if $activeCount==true}
    <div class="row gx-3 justify-content-end ">
        {#if !$worker}
            <div class="col">
                <div class="p-1 koll edit rounded border" on:keypress on:click={editTask}><i class="bi bi-pencil-square"></i></div>
            </div>
            <div class="col">
                <DeleteTask task={task.id}></DeleteTask>
            </div>
            <div class="col-5 rounded">
                <div class="koll p-3 rounded border" on:keypress on:click={finishTask}> Finish task</div>
            </div>
        {:else}
            
            {#if task.worker==t.name}
                <div class="col">
                    <div class="koll p-1 rounded border">
                        <h5 on:keypress on:click={claimTask}>Unclaim task</h5>
                    </div>
                </div>
                <div class="col rounded ">
                    <div class="koll p-1 rounded border"on:keypress on:click={() => (showModalFinish = true)}><h5>Finish task</h5></div>
                </div>
            {:else if task.worker==""}
                <div class="col">
                    <div class="koll p-1 rounded border">
                        <h5  on:keypress on:click={() => (showModal = true)}>Claim task</h5>
                    </div>
                </div>
            {:else}
                <h5>Task Taken</h5>
            {/if}
        {/if}
    </div>
    {:else}
        <div class="row gx-3 justify-content-end">
            {#if !$worker}
            <div class="col">
                <div class="p-1 koll edit rounded border" on:keypress on:click={editTask}><i class="bi bi-pencil-square"></i></div>
            </div>
            <div class="col">
                
                <DeleteTask task={task.id}></DeleteTask>
                
            </div>
            <div class="col-5">
                <div class="koll p-3 rounded border" on:keypress on:click={finishTask}>Open task</div>
            </div>
            {:else}
            
                    {#if task.worker==t.name}
                        <div class="col">
                            <div class="koll p-1 rounded border">
                                <h5 on:keypress on:click={claimTask}>Unclaim task</h5>
                            </div>
                        </div>
                        <div class="col rounded ">
                            <div class="koll p-1 rounded border" on:keypress on:click={finishTask}><h5>Open task</h5></div>
                        </div>
                    {:else if task.worker==""}
                            <div class="col">
                                <div class="koll p-1 rounded border">
                                    <h5  on:keypress on:click={() => (showModal = true)}>Claim task</h5>
                                </div>
                            </div>
                    {:else}
                    <div class="col">
                        <div class="koll p-1 rounded border">
                            <h5>Task Taken</h5>
                        </div>
                    </div>
                    {/if}
                    
                
            
        {/if}
    </div>
    {/if}
        <div class="row gx-3">
            {#if task.worker!=""}
        <div class="col">
            <div class="koll p-2 rounded workerTitle border">Worker: {task.worker}</div>
        </div>
        {/if}
            
        </div>

        <div class="row gx-3">
            <div class="col-7">
                <div class="p-3 koll rounded border"><p>Deadline</p>{task.deadline}</div>
            </div>
            <div class="col-5">
                <div class="p-2 koll rounded border"><p>Priority</p><Prio backgroundColor={color}></Prio></div>
            </div>
        </div>
        {#if task.worker!=""}
            <div class="row gx-3">
                <div class="col-7">
                    
                    <div class="koll p-2 rounded border">
                        <p>Worker's deadline</p>{task.workerDeadline}
                    </div>
                </div>
                <div class="col">
                    <div class="koll p-2 rounded border">
                        <p>Workers price</p>
                        {task.price} kr
                    </div>
                </div>
            </div>
        {/if}
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
    .edit{
        height: 56px;
    }
    .bi-pencil-square{
        font-size: 30px;
    }
    .workerTitle{
        font-size: 18px;
    }
   
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