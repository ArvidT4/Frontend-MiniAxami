<script>
    import {push} from "svelte-spa-router"
    import { token, worker } from "../store";
      let code;
      $: localStorage.clear()
      async function registerWorker(){
          
          let url = "https://mini-axami-server.arvpet0320.repl.co/code";
          let response = await fetch(url,{
              
              method: 'POST',
              headers:{
                  "Content-Type":"application/json"
              },
              body: JSON.stringify({
                  "code": code,
                  "token": $token
              })
          })
          const json = await response.json()
          //console.log(json)
          worker.set(true)
          token.set(json.newToken)
          push("/Units")
      }
  </script>
  
  <main class="form-signin w-100 m-auto">
      <form>
        <h2 class="text-primary w-100 text-center">Mini-Axami</h2>
        <h1 class="h3 mb-3 fw-normal">Enter your code</h1>
        <div class="form-floating">
          <input type="text" class="form-control text-dark" id="floatingInput" placeholder="code" bind:value={code}>
          <label for="floatingInput">Your code</label>
        </div>
        
        <div class="w-100 btn btn-lg bg-light bt text-dark border btn-primary button" id="bt" on:keypress on:click={registerWorker}>Sign up as worker!</div>
      </form>
    </main>
  
  
  <style>
    .button{
      margin-top: 20px;
    }
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