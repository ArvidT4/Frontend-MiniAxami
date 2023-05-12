<script>
    import ModalDelete from "./Modals/ModalDelete.svelte";
	let showModalDelete = false;
    export let task;



</script>
<ModalDelete
bind:showModalDelete
bind:task>
</ModalDelete>
<div class="bg-white rounded hoverEffect border" on:keypress on:click={() => (showModalDelete = true)}><i class="bi bi-trash"></i></div>

<style>
    .hoverEffect{
        transition: 0.5s;
    }
    .hoverEffect:hover{
        box-shadow: 0px 0px 3px -1px;
    }
    .bi{
        font-size:30px;
    }
    .border{
        margin:5px;
        padding: 5px;
    }
    
</style>