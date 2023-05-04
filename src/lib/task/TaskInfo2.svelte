<script>
    import { push } from "svelte-spa-router";
import Navbar from "../Navbar.svelte";
import {units,token,tasks} from "../store"
import Task from "./Task.svelte";
import GiveWork from "../worker/GiveWork.svelte";
export let params = {}
let id = params.id

    
    // hitta en unit med rätt id.

  

</script>
<Navbar></Navbar>
<main>
    <div class="card" id="wrap">
        <div class="card-header">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#">Navbar</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                      </li>
                      
                    </ul>
                    <form class="d-flex" role="search">
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                      <button class="btn btn-outline-success" type="submit">Add</button>
                    </form>
                  </div>
                </div>
              </nav>
        </div>
        
        <div class="card-body">
            <h5>Adress:</h5>
            <h5>Description:</h5>
            <div class="container" id="task">
                <div class="row">
                    <div class="col">
                            <h2>Tasks</h2>
                    </div>
                    <div class="col">
                        <div class="task rounded border text-center"><i class="bi bi-plus add"></i></div>
                    </div>
                </div>
            </div>
            
    
        </div>
    </div>
</main>

<style>
    main{
        max-width: 350px;
        margin: auto;
        position: relative;
        top: 50px;
    
    }
    h5{
        margin: 10px;
        margin-top: 30px;
    }
    #wrap{
        margin-top: 0px;
        border: 1px solid black;
    }
    h2{
        margin: 10px;
    }
    #task{
        margin-top: 50px;
    }
    .task{
        background-color: rgb(236, 236, 236);
        
    }
    .add{
        font-size: 30px;
    }

</style>