<script>
// @ts-nocheck

    import { push } from "svelte-spa-router";
    export let params = {}
    import Navbar from "../Navbar.svelte"
    import {tasks, token} from "../store"

    let priority,title="";
    let id = params.id
    let deadline = (new Date()).toJSON().slice(0, 10);
    //$: console.log(deadline)
    //$: console.log(priority)
    async function addTask(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/createTask";

        if(title!=""&&title!="You must name your task" ){
            let response = await fetch(url,{
            
                method: 'POST',
                headers:{
                    "newtoken": $token,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "unit_id":id,
                    "title":title,
                    "priority":priority,
                    "deadline":deadline
                })
            })
            const json = await response.json()
            if(json.mes=="jwt expired"){
                localStorage.clear()
            return push("/loginuser")
        }
            tasks.update(old=>[...old,json])
            push("/UnitInfo/"+id)
            //console.log(json)
        }
        else title="You must name your task"   
        
        
    }
    function back(){
        push("/Unitinfo/"+id)
    }
</script>
<Navbar></Navbar>
<div class="row gx-3 text-start">
    <div class="col">
        <button class="btn backBtn btn-light" on:click={back}>Back</button>
    </div>
</div>
<div class="container bg-white rounded">
    
    <div class="row">
        <div class="col text-center"><h1>Add task</h1></div>
    </div>
    <div class="row">
        <div class="col ">
            <h4>Title</h4>
            <input class="form-control border" type="text" placeholder="Your tasks title" bind:value={title}>
        </div>
    </div>
    <div class="row">
        <div class="col text-center">
            <h4>Priority</h4>
            <select name="dropdown" bind:value={priority}>
                <option value="1">1 - Lowest priority</option>
                <option value="2">2 - Low priority</option>
                <option value="3">3 - Priority</option>
                <option value="4">4 - High priority</option>
                <option value="5">5 - Highest priority</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col text-center">
            <h4>Deadline</h4>
            <input type="date" class="deadline" value={deadline} on:input={e => deadline = e.target.value || deadline}/>
        </div>
    </div>
    <div class="row">
        <div class="col text-center">
            <button type="button" on:click={addTask} class="create btn btn-light border">Add Task</button>
        </div>
    </div>
</div>
    
<style>
    .backBtn{
        margin: auto 5px;
        margin-top: 10px;
    }
    .container{
        margin-top: 0px;
        max-width: 350px;
        padding: 10px;
        border: 1px solid black;
    }
    .col{
        margin: 20px;
    }
    select{
        padding: 5px;
        width: 200px;
    }
    .create{
        padding: 10px;
        width: 200px;
    }
    .deadline{
        padding: 5px;
        width: 200px;
        border-radius: 5px;
    }
</style>