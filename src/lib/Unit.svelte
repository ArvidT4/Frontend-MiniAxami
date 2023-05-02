<script>
    export let unit;
    import Task from "./Task.svelte";
    import { tasks } from "./store"
    getTasks()
    async function getTasks(){

        let url = "https://mini-axami-server.arvpet0320.repl.co/allTasks";

        let response = await fetch(url,{
            headers:{"newtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNjc4Mjg1MDIxMDE2LCJlbWFpbCI6ImFydmlkQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyX2FydmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJBcnZpZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODI4NTAyMSwiZXhwIjoxNzA5ODIxMDIxfQ.52bM1OoVayncfk8GPcUCrLzsIyMylpej3-3LdyIsLoo"}
        })
        $tasks = await response.json()

    }

    
</script>


<details>

    <summary>{unit.name} {unit.id}</summary>

    <div class="unitInfo">

        <p>Adress: {unit.adress}</p>
        <p>Description: {unit.workDesc}</p>
        <h3>TASKS</h3>
        {#each $tasks as task}
            {#if unit.id==task.unit_id}
                <Task task={task}></Task>
            {/if} 
        {/each}
        
    </div>


</details>


<style>

summary{
    font-size:2rem;
    color:#303030;
    background:#eee;
    padding:2%;
    margin-bottom: 1rem;
}

.unitInfo{
    width:100%;
    text-align: left;
    color:red;
}


</style>

