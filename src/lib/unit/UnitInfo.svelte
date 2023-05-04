<script>
    import { push,pop } from "svelte-spa-router";
import Navbar from "../Navbar.svelte";
import {units,token,tasks,worker} from "../store"
import Task from "../task/Task.svelte";
import GiveWork from "../worker/GiveWork.svelte";
    import EditUnit from "./EditUnit.svelte";
export let params = {}
let id = params.id

    //console.log(params)
    //console.log($units)
    
    // hitta en unit med rätt id.
    let unit = $units.find(u=>u.id==id);

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
    function editUnit(){
        push("/UnitInfo/"+unit.id+"/EditUnit/")
    }

</script>
<Navbar></Navbar>
<main>
    <div class="card" id="wrap">
        <div class="card-header">
            {#if $worker}
            <h2 class="text-center">{unit.name}</h2>
            {/if}
            {#if !$worker}
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid text-center">
                    
                    
                    <h2 class="navbar-brand">{unit.name}</h2>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center ul">
                        <li class="nav-item rounded border bg-white editP">
                            <p on:keypress on:click={editUnit}>Redigera</p>
                        </li>
                        <li class="nav-item rounded border bg-white">
                            {#if remove == true}
                            <p on:keypress on:click={deleteUnit}>Är du säker på att du vill ta bort?</p>
                            {:else}
                            <p on:keypress on:click={deleteClick}>Ta bort</p>
                            {/if}
                            
                        </li>
                        
                        </ul>
                        <form class="d-flex" role="search">
                            <GiveWork unit_id={unit.id}></GiveWork>
                        </form>
                    </div>
                 
                </div>
              </nav>
              {/if}
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