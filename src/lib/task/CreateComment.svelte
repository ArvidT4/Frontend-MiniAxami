<script>
    import { tasks,token, dateYear, dateHour } from "../store";
    export let task

    let now = new Date(),
        minute = '' + now.getMinutes(),
        hour = '' + now.getHours(),
              month = '' + (now.getMonth() + 1),
               day = '' + now.getDate(),
               year = now.getFullYear(),
              dateString;
  
      $: if (month.length < 2) 
        month = '0' + month;
      
      $: if (day.length < 2) 
            day = '0' + day;
      
    dateYear.set([year, month, day].join('/'));
    dateHour.set([hour,minute].join(":"));
    
    
    let comment=""
    async function addComment(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/addComment";
        
        let response = await fetch(url,{
            
            method: 'POST',
            headers:{
                "newtoken":$token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "comment":comment,
                "id":task,
                "date1":$dateYear,
                "date2":$dateHour,
                

            })
        })
        const json = await response.json();
        
        //console.log(json);
        let updatedId = $tasks.findIndex(task=>task.id==json.id)
        $tasks[updatedId] = json;
        tasks.update(old=>[...old]);
        comment="";

    }
</script>
<div class="container">
    <div class="row p-2 rounded">
        <div class="col-7">
            <input type="text" class="form-control" bind:value={comment} placeholder="Comment">
        </div>
        <div class="col-4 ">
            <button on:click={addComment} class="btn btn-primary" >Add comment</button>
        </div>
    </div>
</div>

<style>
    .container{
        margin-top: 10px;
    }
    .col-7{
        margin: auto;
    }
    input{
        background-color: rgb(221, 221, 221);
    }
    .container{
        border-radius: 10px;
    }
</style>