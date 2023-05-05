<script>
     import {push,pop,replace} from "svelte-spa-router"
    
     import {worker} from "./store"

     const goBack =()=>{
      pop()
     }
</script>
<nav class="navbar navbar-expand-lg bg-body-tertiary border border-top-0">
    <div class="container-fluid ">
      <div class="navbar-brand"><h2 class="text-primary w-100 text-center"><a href="/#/Units">Mini-Axami</a></h2></div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/#/Units">Units</a>
          </li>
          {#if !$worker}
          <li class="nav-item">
            <a class="nav-link" href="/#/CreateUnit">Add Unit</a>
          </li>
          {/if}
          <li class="nav-item">
            <a class="nav-link" href="/#/Logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <button on:click={goBack} class="btn btn-light back">back</button>


<style>
  .back{
    margin: 10px;
margin-bottom: -20px;
  }
  a{
    text-decoration: none;
  }
</style>