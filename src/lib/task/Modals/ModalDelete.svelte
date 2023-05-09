<script>
	// @ts-nocheck
	export let showModalDelete;
	export let task;
	import {token,tasks} from "../../store"
	import {pop} from "svelte-spa-router"
	let dialog; 

	//$:console.log(task)
	$: if (dialog && showModalDelete) dialog.showModal();
    
	async function deleteTask(){
    let response = await fetch('https://mini-axami-server.arvpet0320.repl.co/deleteTask/' + task, {
        method:'DELETE'
    }) 
    let json = await response.json()
    console.log(json)

    if(json.error){return}

    tasks.update(old => old.filter(t=>t.id!=task));

    console.log(task)
    pop();
}
 
	
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	class="rounded border"
	on:close={() => (showModalDelete = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		
        <div class="container-md text-center">
			<div class="row">
				<div class="col-9">
					<h4 class="slotHeader text-start">
						Are you sure?
					</h4>
				</div>
				<div class="col-2">
					<!-- svelte-ignore a11y-autofocus -->
					<button class="btn btn-primary" autofocus on:click={() => dialog.close()}><i class="bi bi-x-square"></i></button>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<button class="btn deleteBtn btn-primary" on:click={deleteTask}>Delete task</button>
				</div>
			</div>
           
        </div>
	</div>
</dialog>
<style>
    .slotHeader{
        margin-bottom: 0px;
    }
	.deleteBtn{
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

