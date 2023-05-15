<script>
    // @ts-nocheck
    
        export let showModalUnclaim;
        export let task; 
        import {push} from "svelte-spa-router"
        import {token} from "../../store"
        let comment="";
        let dialog, price=0;
        let workerDeadline = (new Date()).toJSON().slice(0, 10);
        //$:console.log(task)
        $: if (dialog && showModalUnclaim) dialog.showModal();
    
        async function claimTask(){
            if(comment!=""){
                let url = "https://mini-axami-server.arvpet0320.repl.co/updateWorker/"+task.id;
    
                let response = await fetch(url,{
                    method:'PUT',
                    headers:{"newtoken":$token,
                    "Content-Type":"application/json"},
                    body: JSON.stringify({
                        "price":price,
                        "workerDeadline":workerDeadline,
                        "comment":comment
                    })
                })
                let json = await response.json()
                if(json.mes=="jwt expired"){
                    localStorage.clear()
                    return push("/loginuser")
                }
                //console.log(json)
                task = json
            }
            else{
                alert("You must leave a comment")
            }
            
        }
    </script>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <dialog
        bind:this={dialog}
        class="rounded border"
        on:close={() => (showModalUnclaim = false)}
        on:click|self={() => dialog.close()}
    >
        <div on:click|stopPropagation>
            
            <div class="container-md text-center">
                <div class="row">
                    <div class="col">
                        <h4 class="slotHeader">
                            Unclaim the job
                        </h4>
                    </div>
                    <div class="col-2">
                        <!-- svelte-ignore a11y-autofocus -->
                        <button class="btn btn-primary align-items-end" autofocus on:click={() => dialog.close()}><i class="bi bi-x-square"></i></button>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <h5 class="comment">Leave a comment</h5>
                        <textarea name="" id="" cols="30" rows="3" bind:value={comment}></textarea>
                    </div>
                </div>
                <div class="row ">
                    <div class="col buttonCol align-items-center">
                        <button class="btn btn-primary" on:click={() => dialog.close()} on:click={claimTask}>Take the job</button>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
    <style>
        .comment{
            margin-top: 10px;
        }
        .slotHeader{
            margin-bottom: 0px;
        }
        .buttonCol{
            margin-top: 20px;
        }
        dialog {
            max-width: 90%;
            border-radius: 0.2em;
            border: none;
            padding: 0px;
        }
        dialog::backdrop {
            background: rgba(0, 0, 0, 0.3);
        }
        dialog > div {
            padding: 1em;
        }
        dialog[open] {
            animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes zoom {
            from {
                transform: scale(0.95);
            }
            to {
                transform: scale(1);
            }
        }
        dialog[open]::backdrop {
            animation: fade 0.2s ease-out;
        }
        @keyframes fade {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        button {
            display: block;
        }
    </style>
    
    