 <script>
    import {units} from "./store"
    let result = null
    let name="";
    let adress="";
    let description="";
    async function addUnit(){
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/addUnit";
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNjc4Mjg1MDIxMDE2LCJlbWFpbCI6ImFydmlkQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyX2FydmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJBcnZpZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODI4NTAyMSwiZXhwIjoxNzA5ODIxMDIxfQ.52bM1OoVayncfk8GPcUCrLzsIyMylpej3-3LdyIsLoo"
        let response = await fetch(url,{
            
            method: 'POST',
            headers:{
                "newtoken":token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "name": name,
                "adress": adress,
                "workDesc": description
            })
        })
        const json = await response.json()
        result = JSON.stringify(json)
       units.update(old => [...old,json])

    }

    let count = 0;
    function test(){
        
        if(count==1){
            count-=1
        }
        else
            count+=1                  
            

        console.log(count)
    }
 </script>
<button on:click={test}>Skapa egen unit</button>

 {#if count == 1}
<div id="wrap">
    <div>
        <h4>name</h4>
        <input type="text" bind:value={name}>
    </div>
    <div>
        <h4>adress</h4>
        <input type="text" bind:value={adress}>
    </div>
    <div>
        <h4>description</h4>
        <input type="text" bind:value={description}>
    </div>
    
 <button on:click={addUnit}>LÄGG TILL DIN UNIT</button>
</div>
 
 {/if}



 <style>
    #wrap{
        width: 100%;
        display: flex;
        justify-content: center;
        background:#eee;
    }
    #wrap div{
        margin: 10px;
    }
    input{
        padding: 10px;
        font-size: 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
   
 </style>