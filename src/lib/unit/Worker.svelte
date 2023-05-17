<script>
    import DeleteRel from "./Modals/DeleteRel.svelte";
    export let user
    export let showModalDelete
    export let unit_id


</script>

<DeleteRel bind:showModalDelete bind:user bind:unit_id></DeleteRel>
<div class="container">
    <div class="row workerRow rounded border bg-white" on:keypress on:click={() => (showModalDelete = true)}>
        <div class="col-9 trashCol">
            <div>{user.name} : {user.email}</div>
        </div>
        <div class="col trashed">
            <div class="trash bg-white"><i class=" bi bi-trash"></i></div>
        </div>
    </div>
</div>

<style>
    .trashed{
        border-left: 1px solid rgb(218, 218, 218);
        transition: 0.5s;
    }
    .workerRow{
        margin-top: 10px;
    }
    .trashCol{
        margin: auto;
    }
    .bi-trash{
        font-size: 30px;
    }
    .trash{
        margin: 10px auto;        
    }
    .trashed:hover{
        box-shadow: 0px 0px 2px 0px;
    }
</style>