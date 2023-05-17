<script> 
    import {tasks, token} from "../store"
    import Navbar from "../Navbar.svelte";
    import { pop,push } from "svelte-spa-router";
    export let params = {}
    let id = params.id
    let taskTitle = params.title
    let title="", priority, deadlineTitle="Deadline", deadlineTitleClass="";
    let deadlineClass;
    let deadline = (new Date()).toJSON().slice(0, 10);
    let date = (new Date()).toJSON().slice(0, 10);
    async function editTask(){
        if(title==""){
            title=taskTitle
        }

        if(deadline>=date){
            let url = "https://mini-axami-server.arvpet0320.repl.co/EditTask/"+id;
        
            let response = await fetch(url,{
                
                method: 'PUT',
                headers:{
                    "newtoken":$token,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "title":title,
                    "deadline": deadline,
                    "priority": priority
                })
            })
            const json = await response.json()
            if(json.mes=="jwt expired"){
                localStorage.clear()
                return push("/loginuser")
            }
            tasks.set(json)
            pop()
        }
        else{
            deadlineClass="bg-danger-subtle border border-danger-subtle" 
            deadlineTitle="Your deadline is set to a date that has already pasted"
			deadlineTitleClass="text-danger"
        }
    }
    function back(){
        pop()
    }

</script>
<Navbar></Navbar>
 
<main>
    <div class="row gx-3 text-start">
        <div class="col">
            <button class="btn backBtn btn-light" on:click={back}>Back</button>
        </div>
    </div>
    <div class="card" id="wrap">
        <div class="card-header text-center">
            <h2 class="text-center title ">Edit {taskTitle}</h2>
        </div>
        
        <div class="card-body">
            <h4>Title</h4>
            <input class="form-control" type="text" bind:value={title}>
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
                    <h4 class="{deadlineTitleClass}">{deadlineTitle}</h4>
                    <input type="date" class="deadline {deadlineClass}" value={deadline} on:input={e => deadline = e.target.value || deadline}/>
                </div>
            </div>
            <div class="text-center button"><button on:click={editTask} class="btn btn-primary mb-3 fs-4">Save</button></div>
        </div>
    </div>
</main>


 <style>
    
    .backBtn{
        margin: auto 5px;
        margin-top: -15px;
        margin-bottom: 10px;
    }
    main{
        max-width: 350px;
        margin: auto;
        position: relative;
        top: 50px;
    }
    .button{
        margin-top: 30px;
    }
    button{
        padding: 10px;
    }
   
 </style>