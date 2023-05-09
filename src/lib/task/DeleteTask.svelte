<script>
    import ModalDelete from "./Modals/ModalDelete.svelte";
	let showModalDelete = false;
    export let task;



</script>
<ModalDelete
bind:showModalDelete
bind:task>
</ModalDelete>
<div class="bg-white rounded border" on:keypress on:click={() => (showModalDelete = true)}><i class="bi bi-trash"></i></div>

<style>
    .bi{
        font-size:30px;
    }
    .border{
        margin:5px;
        padding: 5px;
    }
</style>