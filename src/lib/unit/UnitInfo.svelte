<script>
    import { push,pop } from "svelte-spa-router";
import Navbar from "../Navbar.svelte";
import {units,token,tasks,worker, updateWorkRel} from "../store"
import Task from "../task/Task.svelte";
import GiveWork from "../worker/GiveWork.svelte";
    import EditUnit from "./EditUnit.svelte";
export let params = {}
let id = params.id

    //console.log(params)
    //console.log($units)
    
    // hitta en unit med rätt id.
    let unit = $units.find(u=>u.id==id);
    let workRel = []
    getWorkRel()
    $:if($updateWorkRel==true){
        getWorkRel()
        updateWorkRel.set(false);
    }
    async function getWorkRel(){

        let url = "https://mini-axami-server.arvpet0320.repl.co/workRel/"+id;

        let response = await fetch(url,{
            headers:{"newtoken":$token}
        })
        let json = await response.json()
        workRel = json
    }
    getTasks()
    async function getTasks(){

        let url = "https://mini-axami-server.arvpet0320.repl.co/allTasks";

        let response = await fetch(url,{
            headers:{"newtoken":$token}
        })
        let data = await response.json()
        tasks.set(data);
        

    }
    const createTask = () =>{
        push("/createTask/"+unit.id+"/")
    }
    let remove = false;
    function deleteClick(){
        remove = true;
    }
    async function deleteUnit(){
        let response = await fetch('https://mini-axami-server.arvpet0320.repl.co/deleteUnit/'+unit.id,{
            method:'DELETE',
            headers:{
                "newtoken":$token,
                "Content-Type":"application/json"
            }
        }) 
        let json = await response.json()
        //console.log(json)

        if(json.error){return}
        
        units.update(old => old.filter(u=>u.id!=unit.id));

        pop();
}
let t = JSON.parse(atob($token.split(".")[1]))
async function deleteWorkRel(){
        let response = await fetch('https://mini-axami-server.arvpet0320.repl.co/removeWorkRel',{
            method:'DELETE',
            headers:{
                "newtoken":$token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "worker_id": t.id,
                "unit_id": id
            })
        }) 
        let json = await response.json()
        console.log(json)

        if(json.error){return}
        
        units.update(old => old.filter(u=>u.id!=id));

        pop();
}

    function editUnit(){
        push("/UnitInfo/"+unit.id+"/EditUnit/")
    }
    function back(){
        push("/units")
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
        <div class="card-header">
            <nav class="navbar navbar bg-body-tertiary">
                <div class="container-fluid text-center">
                    
                    
                    <h2 class="navbar-brand">{unit.name}</h2>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center ul">
                            {#if !$worker}
                        <li class="nav-item rounded border bg-white editP">
                            <p on:keypress on:click={editUnit}>Edit <i class="bi bi-pencil-square"></i></p>
                        </li>
                        <li class="nav-item rounded border bg-white">
                            {#if remove == true}
                            <p on:keypress on:click={deleteUnit}>Are you sure?</p>
                            {:else}
                            <p on:keypress on:click={deleteClick}>Remove unit <i class="bi bi-trash"></i></p>
                            {/if}
                            
                        </li>
                        <li>
                            <h5 class="addWorker">Add worker</h5>
                        </li>
                        <form class="d-flex" role="search">
                            <GiveWork unit_id={id}></GiveWork>
                        </form>
                        {#if workRel.length !=0}
                            <li>
                                <h5>Alla arbetare kopplade</h5>
                                
                                    {#each workRel as user}
                                    <p>{user.name} : {user.email}</p>
                                    {/each}
                            
                            </li>
                        {/if}
                        {:else}
                        <li class="nav-item rounded border bg-white">
                            {#if remove == true}
                            <p on:keypress on:click={deleteWorkRel}>Are you sure?</p>
                            {:else}
                            <p on:keypress on:click={deleteClick}>Remove unit <i class="bi bi-trash"></i></p>
                            {/if}
                            
                        </li>
                        {/if}
                        
                        </ul>
                        
                    </div>
                    
                </div>
              </nav>
              
        </div>
        
        <div class="card-body">
            <h5>Adress: {unit.adress}</h5>
            <h5>Description: {unit.workDesc}</h5>
            <div class="container text-center" id="task">
                <div class="row">
                    <div class="col">
                        <h2>Tasks</h2>
                    </div>
                    {#if !$worker}
                    <div class="col">
                        <div class="task rounded border text-center" on:keypress on:click={createTask}><i class="bi bi-plus add"></i></div>
                    </div>
                    {/if}
                    
                </div>
            </div>
            
            {#each $tasks as task}
                {#if unit.id==task.unit_id}
                    <Task task={task}></Task>
                {/if} 
            {/each}
        </div>
    </div>
</main>

<style>
    .backBtn{
        margin: auto 5px;
        margin-top: -15px;
        margin-bottom: 10px;
    }
    .addWorker{
        margin-top: 15px;
        margin-bottom: 0px;
    }
    .d-flex{
        margin-top: 10px;
    }
    .editP{
        margin-bottom: 10px;
    }
    main{
        max-width: 350px;
        margin: auto;
        position: relative;
        top: 50px;
    
    }
    p{
        margin:10px auto ;
        
    }
    h5{
        margin: 10px;
        margin-top: 30px;
    }
    #wrap{
        margin-top: 0px;
        border: 1px solid black;
    }
    h2{
        margin: 10px;
    }
    #task{
        margin-top: 50px;
    }
    .task{
        background-color: rgb(236, 236, 236);
        
    }
    .add{
        font-size: 30px;
    }

</style>