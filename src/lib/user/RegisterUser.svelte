<script>
    import { push } from "svelte-spa-router";


    let name="", email="", password="";
    let nameClass, emailClass, passwordClass, titleClass, title = "Please sign up";
    $: localStorage.clear()
    async function registerUser(){
        if(name!=""&&email!=""&&password!=""){
          let url = "https://mini-axami-server.arvpet0320.repl.co/register";
          let response = await fetch(url,{
              
              method: 'POST',
              headers:{
                  "Content-Type":"application/json"
              },
              body: JSON.stringify({
                  "name": name,
                  "email": email,
                  "password": password
              })
          })
          const json = await response.json()
          console.log(json)
          if(json=="Name already in use"){
            titleClass="text-danger"
            title=json
          }
          else if(json=="Name and email already in use"){
            title=json 
            titleClass="text-danger"
          }
          else if(json=="Email already in use") {
            title=json 
            titleClass="text-danger"
          }
          
          else push("/LoginUser")
        }
        else{
          if(name==""){
            nameClass="bg-danger-subtle border border-danger-subtle"
          }
          if(email==""){
            emailClass="bg-danger-subtle border border-danger-subtle"
          }
          if(password==""){
            passwordClass="bg-danger-subtle border border-danger-subtle"
          }
        }
        
    }

</script>

<main class="form-signin w-100 m-auto">
    <form>
      <h2 class="text-primary w-100 text-center">Mini-Axami</h2>
      <h1 class="h3 mb-3 fw-normal {titleClass}">{title}</h1>
      <div class="form-floating">
        <input type="email" class="form-control text-dark {nameClass}" id="floatingInput" placeholder="name" bind:value={name}>
        <label for="floatingInput">Full Name</label>
      </div>
      <div class="form-floating">
        <input type="email" class="form-control text-dark {emailClass}" id="floatingInputEmail" placeholder="Email" bind:value={email}>
        <label for="floatingInputEmail">Email address</label>
      </div>
      <div class="form-floating classen">
        <input type="password" class="form-control text-dark {passwordClass}" id="floatingPassword" placeholder="Password" bind:value={password}>
        <label for="floatingPassword">Password</label>
      </div>
      <a href="/#/LoginUser">Already have an account?</a>
      <div class="w-100 btn btn-lg bg-light bt text-dark border btn-primary" id="bt" on:keypress on:click={registerUser}>Sign up!</div>
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