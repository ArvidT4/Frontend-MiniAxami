<script>
    import { token, worker } from "../store";
    import {push,pop,replace} from "svelte-spa-router"


    $: localStorage.clear()
    let email, password;
    async function Login(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/Login";

        let response = await fetch(url,{
            
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        const json = await response.json()
        $token = json.newToken
        worker.set(false)
        push('/Units')
    }
</script>


<!-- <h3>Email</h3>
<input type="email" bind:value={email}>
<h3>Password</h3>
<input type="password" bind:value={password}> -->

<main class="form-signin w-100 m-auto">
    <form>
      <h2 class="text-primary w-100 text-center">Mini-Axami</h2>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
  
      <div class="form-floating">
        <input type="email" class="form-control text-dark" id="floatingInput" placeholder="Email" bind:value={email}>
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating classen">
        <input type="password" class="form-control text-dark" id="floatingPassword" placeholder="Password" bind:value={password}>
        <label for="floatingPassword">Password</label>
      </div>
      <a href="/#/registerUser">You do not have an account? Sign up!</a>
      <div class="w-100 btn btn-lg bg-light bt text-dark border btn-primary" id="bt" on:keypress on:click={Login}>Sign in</div>
    </form>
  </main>


<style>
  main{
    max-width: 350px;
    margin: auto;
    
  }
  .classen{
    margin-bottom: 30px;
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