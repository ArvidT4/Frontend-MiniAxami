<script>
    import {token, tasks} from "../store"

        token.set("");
        tasks.set([]);
        localStorage.clear()
        //console.log($tasks)

</script>

<div class="container">
    <h2>You have been logged</h2>
    <p>Would you like to sign in? <a href="/#/LoginUser">Sign in</a></p>
</div>