<script>
    import {push} from "svelte-spa-router"
    import {token, units, worker} from "../store"
      let email;
      $: localStorage.clear()
      async function loginWorker(){
          localStorage.clear()

          let url = "https://mini-axami-server.arvpet0320.repl.co/loginWorker";
          let response = await fetch(url,{
              
              method: 'POST',
              headers:{
                  "Content-Type":"application/json"
              },
              body: JSON.stringify({
                  "email": email,
              })
          })
          const json = await response.json()
          //console.log(json)
          token.set(json.token)
          units.set([])
          push("/ValidateCode")
          //console.log($token)
      }
  </script>
  
  <main class="form-signin w-100 m-auto">
    <div><a href="/#/loginuser">User? press here.</a></div>
      <form>
        
        <h2 class="text-primary w-100 text-center">Mini-Axami</h2>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
          <input type="email" class="form-control text-dark" id="floatingInput" placeholder="Email" bind:value={email}>
          <label for="floatingInput">Email address</label>
        </div>
        <a href="/#/RegisterWorker">Do not have an account?</a>
        <div class="w-100 btn btn-lg bg-light bt text-dark border btn-primary" id="bt" on:keypress on:click={loginWorker}>Sign in as worker!</div>
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
    .form-floating{
        margin-bottom: 20px;
    }
  </style>