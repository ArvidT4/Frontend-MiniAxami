<script>
  import {push} from "svelte-spa-router"
    let name, email;
    localStorage.clear()
    async function registerWorker(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/registerWorker";
        let response = await fetch(url,{
            
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
            })
        })
        const json = await response.json()
        console.log(json)
        push("/LoginWorker")
    }
</script>

<main class="form-signin w-100 m-auto">
    <form>
      <h2 class="text-primary w-100 text-center">Mini-Axami</h2>
      <h1 class="h3 mb-3 fw-normal">Please sign up as worker</h1>
      <div class="form-floating">
        <input type="email" class="form-control text-dark" id="floatingInput" placeholder="name" bind:value={name}>
        <label for="floatingInput">Full Name</label>
      </div>
      <div class="form-floating">
        <input type="email" class="form-control text-dark" id="floatingInput" placeholder="Email" bind:value={email}>
        <label for="floatingInput">Email address</label>
      </div>
      <a href="/#/LoginWorker">Already have an account?</a>
      <div class="w-100 btn btn-lg bg-light bt text-dark border btn-primary" id="bt" on:keypress on:click={registerWorker}>Sign up as worker!</div>
    </form>
  </main>


<style>
  main{
    max-width: 350px;
    margin: auto;
    
  }
  form{
    margin-top: 150px;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background: rgb(255, 255, 255);
  }
  h2{
    font-size: 35px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  input{
    font-size: 20px;
    color: black;
  }
</style>