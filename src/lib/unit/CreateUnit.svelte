 <script>
import Navbar from "../Navbar.svelte";
import { push } from "svelte-spa-router";
import {units, token, worker} from "../store"
   
    $: if($worker){
        push("/HomeWorker")
    }
    let name, adress, description,priority;

    let deadline = (new Date()).toJSON().slice(0, 10);

    async function addUnit(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/addUnit";
        
        let response = await fetch(url,{
            
            method: 'POST',
            headers:{
                "newtoken":$token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "name": name,
                "adress": adress,
                "workDesc": description
            })
        })
        const json = await response.json()
        if(json.mes=="jwt expired"){
            localStorage.clear()
            return push("/loginuser")
        }
       units.update(old => [...old,json])
       push("/unitInfo/"+json.id)

    }
    function back(){
        push("/units")
    }
    //$:console.log(deadline)
    
    
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
            <h2 class="text-center title ">Create your unit</h2>
        </div>
        
        <div class="card-body">
            <h4>Name</h4>
            <input class="form-control" type="text" bind:value={name}>
            <h4>Adress</h4>
            <input class="form-control" type="text" bind:value={adress}>
            <h4>Description</h4>
            <textarea class="form-control" cols="36" rows="5" bind:value={description}></textarea>
            <div class="text-center button"><button on:click={addUnit} class="btn btn-primary mb-3 fs-4">Add your unit</button></div>
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
        padding: 20px;
    }
   
 </style>