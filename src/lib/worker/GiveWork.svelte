<script>
    import { updateWorkRel } from "../store";


    
    export let unit_id;
    let email;
    async function giveWork(){
        
        if(email!=""){
            let url = "https://mini-axami-server.arvpet0320.repl.co/giveWork";
            let response = await fetch(url,{
                
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    "id": unit_id,
                    "email": email,
                })
            })
            const json = await response.json()
            console.log(json)
            if(json=="not a worker"){
                email = json
            }
            else if(json=="user not found"){
                email = json
            }
            else if(json=="Relation already set"){
                email = json
            }
            updateWorkRel.set(true);
        }
        
    }
    

</script>
<div class="form-floating">
    <input type="email" class="form-control text-dark" placeholder="Email" bind:value={email}>
    <label for="floatingInput">Email address</label>
</div>
    <button class="btn  btn-outline-primary btn-white" on:click={giveWork}>add</button>


  <style>
   .form-floating{
        width:100%;
    } 
  </style>