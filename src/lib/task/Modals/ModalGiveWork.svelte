<script>
	// @ts-nocheck
	export let showModalGiveWork;
	export let worker_name
    export let task
    export let id
	import {token, workRel} from "../../store"
	let dialog,comment;
    $:console.log(id)
	$: if (dialog && showModalGiveWork) dialog.showModal();
    let taken = false;

    async function giveWorkerWork(){
        if(worker_name!=""){
            let url = "https://mini-axami-server.arvpet0320.repl.co/giveWorkerWork";

            let response = await fetch(url,{
                method: 'POST',
                headers:{"newtoken":$token,
                "Content-Type":"application/json"
            },
                body: JSON.stringify({
                    "worker_name":worker_name,
                    "task_id":id,
                    "comment":comment
                })
            })
            let json = await response.json()
            task = json
            console.log(task)
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
		
        <div class="container-md">
			<div class="row">
				<div class="col">
					<h4 class="slotHeader">
						Give work
					</h4>
				</div>
				<div class="col-2">
					<!-- svelte-ignore a11y-autofocus -->
					<button class="btn btn-primary align-items-end" autofocus on:click={() => dialog.close()}><i class="bi bi-x-square"></i></button>
				</div>
			</div>
            <div class="row">
                <div class="col">
                    <select bind:value={worker_name}>
                        {#each $workRel as user}
                            <option value={user.name}>
                                {user.name}
                            </option>
                        {/each}
                    </select>
                </div>
                <div class="col">
                    <h5>Comment</h5>
                    <input type="text" bind:value={comment}>
                </div>
            </div>
            <div class="row">
                <div class="col buttonCol">
                    <button class="btn btn-primary" on:click={() => dialog.close()} on:click={giveWorkerWork}>Send</button>
                </div>
            </div>
        </div>
	</div>
</dialog>
<style>
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

