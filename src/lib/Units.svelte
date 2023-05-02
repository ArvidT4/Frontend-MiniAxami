<script>
    import Unit from "./Unit.svelte";
    import {units} from "./store"
    
    getUnits()
    async function getUnits(){

        let url = "https://mini-axami-server.arvpet0320.repl.co/allUnits";

        let response = await fetch(url,{
            headers:{"newtoken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoxNjc4Mjg1MDIxMDE2LCJlbWFpbCI6ImFydmlkQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyX2FydmlkQGdtYWlsLmNvbSIsIm5hbWUiOiJBcnZpZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODI4NTAyMSwiZXhwIjoxNzA5ODIxMDIxfQ.52bM1OoVayncfk8GPcUCrLzsIyMylpej3-3LdyIsLoo"}
        })
        $units = await response.json()
    }



</script>
{#each $units as unit }
    <Unit unit={unit}></Unit>
{/each}