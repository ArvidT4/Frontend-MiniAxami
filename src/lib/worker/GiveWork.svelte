<script>

    
    export let unit_id;
    let email;
    async function giveWork(){
        
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