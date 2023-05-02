<script>
    let name, email, password;

    async function registerUser(){
        
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
        let result = JSON.stringify(json)

    }

</script>


<h2>Sign up</h2>

<input type="text" bind:value={name}>
<input type="email" bind:value={email}>
<input type="password" bind:value={password}>
<button on:click={registerUser}></button>