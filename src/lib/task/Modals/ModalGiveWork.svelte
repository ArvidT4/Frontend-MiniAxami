<script>
	// @ts-nocheck
	export let showModalGiveWork;
	export let worker_email
    export let task
    export let id
	import {push} from "svelte-spa-router"
	import {token, workRel} from "../../store"
    import GiveWork from "../../worker/GiveWork.svelte";
	let dialog,comment="";
    //$:console.log(id)
	$: if (dialog && showModalGiveWork) dialog.showModal();
    let taken = false;

    async function giveWorkerWork(){
        if(worker_email!="" && comment!=""){
            let url = "https://mini-axami-server.arvpet0320.repl.co/giveWorkerWork";

            let response = await fetch(url,{
                method: 'POST',
                headers:{"newtoken":$token,
                "Content-Type":"application/json"
            },
                body: JSON.stringify({
                    "worker_email":worker_email,
                    "task_id":id,
                    "comment":comment
                })
            })
            let json = await response.json()
			if(json.mes=="jwt expired"){
				localStorage.clear()
            	return push("/loginuser")
        	}
            task = json
            //console.log(task)
        }
            
        
    }
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	class="rounded border"
	on:close={() => (showModalGiveWork = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		
        <div class="container-md ">
			<div class="row">
				<div class="col">
					<h4 class="slotHeader">
						Give work
					</h4>
				</div>
				<div class="col-3">
					<!-- svelte-ignore a11y-autofocus -->
					<button class="btn btn-primary align-items-end" autofocus on:click={() => dialog.close()}><i class="bi bi-x-square"></i></button>
				</div>
			</div>
			{#if $workRel.length==0}
			<div class="row">
				<GiveWork unit_id={task.unit_id}></GiveWork>
			</div>
			
			{:else}
            <div class="row flex">
                <div class="col">
                    <select bind:value={worker_email}>
                        {#each $workRel as user}
                            <option value={user.email}>
                                {user.name}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="col">
                    <h5>Comment</h5>
                    <textarea type="text" class="form-control" name="" id="" cols="30" rows="2" bind:value={comment}></textarea>
                </div>
            </div>
            <div class="row ">
                <div class="col buttonCol">
                    <button class="btn btn-primary" on:click={() => dialog.close()} on:click={giveWorkerWork}>Send</button>
                </div>
            </div>
			{/if}
        </div>
		
	</div>
</dialog>
<style>
	.flex{
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	select{
		width: 100%;
		height: 40px;
	}
    .slotHeader{
        margin-bottom: 30px; 
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

