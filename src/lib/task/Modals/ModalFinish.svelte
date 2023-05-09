<script>
	// @ts-nocheck
	export let showModalFinish;
	export let task;
	import {token, activeCount} from "../../store"
	let dialog, price; 
	let workerDeadline = (new Date()).toJSON().slice(0, 10);
	//$:console.log(task)
	$: if (dialog && showModalFinish) dialog.showModal();
    let taken = false;

    let t = JSON.parse(atob($token.split(".")[1]))
    async function finishTask(){
        if(t.name==task.worker){
				let url = "https://mini-axami-server.arvpet0320.repl.co/finishTask/"+task.id;

				let response = await fetch(url,{
					method: 'POST',
					headers:{"newtoken":$token,
					"Content-Type":"application/json"
				},
					body: JSON.stringify({
						"price":price,
						"workerDeadline":workerDeadline
					})
				})
				let json = await response.json()
				task = json;
				activeCount.set(task.active);
				//console.log("JSON",json)
				//console.log("TASK",task)
			
			
        }
        else{
            taken = true;
        }
        
    }
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	class="rounded border"
	on:close={() => (showModalFinish = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		
        <div class="container-md">
			<div class="row">
				<div class="col">
					<h4 class="slotHeader">
						Finish the task
					</h4>
				</div>
				<div class="col-2">
					<!-- svelte-ignore a11y-autofocus -->
					<button class="btn btn-primary align-items-end" autofocus on:click={() => dialog.close()}><i class="bi bi-x-square"></i></button>
				</div>
			</div>
            <div class="row text-center">
                <div class="col">
                    <h5>price in kr</h5>
                    <input class="form-floating" type="number" bind:value={price}>
                </div>
                <div class="col">
                    <h5>Deadline</h5>
                    <input type="date" value={workerDeadline} on:input={e => workerDeadline = e.target.value || workerDeadline}/>
                </div>
            </div>
            <div class="row">
                <div class="col buttonCol">
                    <button class="btn btn-primary" on:click={() => dialog.close()} on:click={finishTask}>Take the job</button>
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

