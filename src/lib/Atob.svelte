<script>
    import {token} from "./store"
    import {push} from "svelte-spa-router"

    let t = JSON.parse(atob($token.split(".")[1]))
    let diff;

    $: if($token!="expired"){
        setInterval(()=>{
            diff = t.exp*1000-Date.now()
            if(diff<0){
                token.set("expired")
                return push("/LoginUser")
            }
            else
            {
                //console.log("hfh")
            }
        },10000)
           
    }
    else{
        console.log("expired");
    }
</script>