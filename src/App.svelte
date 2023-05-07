<script>
  import Units from "./lib/Units.svelte";
  import CreateUnit from "./lib/unit/CreateUnit.svelte";
  import CreateComment from "./lib/task/CreateComment.svelte";
  import Router from "svelte-spa-router"  
  import RegisterUser from "./lib/user/RegisterUser.svelte";
  import NotFound from "./lib/NotFound.svelte";
  import LoginUser from "./lib/user/LoginUser.svelte";
  import Home from "./lib/Home.svelte";
  import UnitInfo from "./lib/unit/UnitInfo.svelte";
  import './app.css'
  import TaskInfo from "./lib/task/TaskInfo.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import Logout from "./lib/user/Logout.svelte";
  import CreateTask from "./lib/task/CreateTask.svelte";
  import RegisterWorker from "./lib/worker/RegisterWorker.svelte";
  import LoginWorker from "./lib/worker/LoginWorker.svelte";
  import Validate from "./lib/worker/Validate.svelte";
  import TaskInfo2 from "./lib/task/TaskInfo2.svelte";
  import EditUnit from "./lib/unit/EditUnit.svelte";
  import Atob from "./lib/Atob.svelte";
  let routes = {
    "/": Home,
    "/registerUser": RegisterUser,
    "/LoginUser": LoginUser,
    "/CreateUnit": CreateUnit,
    "/Units": Units,
    "/UnitInfo/:id": UnitInfo,
    "/TaskInfo/:id":TaskInfo,
    "/Logout":Logout,
    "/createTask/:id": CreateTask,
    "/RegisterWorker": RegisterWorker,
    "/LoginWorker": LoginWorker,
    "/ValidateCode": Validate,
    "/TaskInfo2": TaskInfo2,
    "/UnitInfo/:id/EditUnit/": EditUnit,

    "*": NotFound
  }
</script>


<Atob></Atob>
<Router {routes}/>


