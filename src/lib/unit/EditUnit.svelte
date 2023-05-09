<script> 
    import {units, token} from "../store"
    import Navbar from "../Navbar.svelte";
    import { pop,push } from "svelte-spa-router";
    export let params = {}
    let id = params.id
    let name, adress,description;

    let unit = $units.find(u=>u.id==id);
    $:console.log(unit)
    name = unit.name
    adress = unit.adress
    description = unit.workDesc
    async function editUnit(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/updateUnit/"+id;
        
        let response = await fetch(url,{
            
            method: 'PUT',
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
       units.set(json)
       pop()

    }
    function back(){
        push("/Unitinfo/"+id)
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
            <h2 class="text-center title ">Edit unit</h2>
        </div>
        
        <div class="card-body">
            <h4>Name</h4>
            <input class="form-control" type="text" bind:value={name}>
            <h4>Adress</h4>
            <input class="form-control" type="text" bind:value={adress}>
            <h4>Description</h4>
            <textarea class="form-control" cols="36" rows="5" bind:value={description}></textarea>
            <div class="text-center button"><button on:click={editUnit} class="btn btn-primary mb-3 fs-4">Edit your unit</button></div>
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