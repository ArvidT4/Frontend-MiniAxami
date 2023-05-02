<script>
    export let task;
    let count = 0;
    let info = ""
    function test(){
        
        if(count==1){
            count-=1
        }
        else
            count+=1                  
            

        console.log(count)
    }
    $:comments = JSON.parse(task.comment)
    let url = "https://mini-axami-server.arvpet0320.repl.co/finishTask/"+task.id;
    finishTask()
    async function finishTask(){
        if(task.active==1){
            
            let response = await fetch(url,{
                headers:{"newtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNjc4Mjg1MDIxMDE2LCJlbWFpbCI6ImFydmlkQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyX2FydmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJBcnZpZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODI4NTAyMSwiZXhwIjoxNzA5ODIxMDIxfQ.52bM1OoVayncfk8GPcUCrLzsIyMylpej3-3LdyIsLoo"}
            })
            let res = await response.json()

            console.log(res)
            console.log(task.active)
            task.active=0
            info = "TASK INACTIVE"
        }
        if(task.active==0){
            let response = await fetch(url,{
                headers:{"newtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNjc4Mjg1MDIxMDE2LCJlbWFpbCI6ImFydmlkQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyX2FydmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJBcnZpZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODI4NTAyMSwiZXhwIjoxNzA5ODIxMDIxfQ.52bM1OoVayncfk8GPcUCrLzsIyMylpej3-3LdyIsLoo"}
            })
            let res = await response.json()

            console.log(res)
            console.log(task.active)
            task.active=1
            info = "Mark task as finished"
        }
            
        
        
    }
</script>
<div id="wrap">
    <div on:keypress on:click={test} class="card">
    {#if count ==1}
        <p>{task.title}</p>
        {#if comments.length>0}
            <h3>COMMENTS</h3>
            {#each comments as comment}
                <p><i>{comment.name}</i>: {comment.comment}</p>
        
            {/each}
        {/if}
        
    {:else}
        <p>{task.title}</p>
    {/if}

    </div>
    <button on:click={finishTask} id="knapp">{info}</button>
</div>

<style>

.card{
    border: 1px solid black;
    padding:10px;
    margin:10px;
    max-width: 400px;
}
#wrap{
    display: flex;
}
#wrap div{
    margin: 10px;
    width: 100%;
}
#knapp{
    margin: 10px;
    border: 1px solid black;
}

</style>