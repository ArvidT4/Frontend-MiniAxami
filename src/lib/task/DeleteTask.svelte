<script>
    import { pop } from "svelte-spa-router";
    import {tasks} from "../store"


export let task;
async function deleteTask(){
    let response = await fetch('https://mini-axami-server.arvpet0320.repl.co/deleteTask/' + task, {
        method:'DELETE'
    }) 
    let json = await response.json()
    console.log(json)

    if(json.error){return}
 /*    let filteredTasks = $tasks.filter(t=>t.id!=task)
    console.log(filteredTasks)
    tasks.set(filteredTasks)
    
    console.log(tasks) */

    tasks.update(old => old.filter(t=>t.id!=task));

    console.log(task)
    pop();
}


</script>

<!-- {JSON.stringify($tasks)} -->
<div class="bg-white rounded border" on:keypress on:click={deleteTask}><i class="bi bi-trash"></i></div>

<style>
    .bi{
        font-size:40px;
    }
    .border{
        margin: 5px;
        padding: 5px;
    }
</style>