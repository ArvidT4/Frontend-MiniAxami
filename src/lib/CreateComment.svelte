<script>
    let comment=""
    async function addComment(){
        
        
        let url = "https://mini-axami-server.arvpet0320.repl.co/addComment";
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNjc4Mjg1MDIxMDE2LCJlbWFpbCI6ImFydmlkQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyX2FydmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJBcnZpZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODI4NTAyMSwiZXhwIjoxNzA5ODIxMDIxfQ.52bM1OoVayncfk8GPcUCrLzsIyMylpej3-3LdyIsLoo"
        let response = await fetch(url,{
            
            method: 'POST',
            headers:{
                "newtoken":token,
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "comment":comment,
                "id":3
            })
        })
        const json = await response.json()
        let result = JSON.stringify(json)

    }
</script>
<input type="text" bind:value={comment}>
<button on:click={addComment}>Add comment</button>
