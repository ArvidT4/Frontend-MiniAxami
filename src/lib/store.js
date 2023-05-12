import {writable} from "svelte/store"

//export const tasks = writable([]);
//export const units = writable([]);
//export const token = writable("");


export const dateYear = writable("")
export const dateHour = writable("")
export const activeCount = writable(false)

const storedToken = localStorage.getItem("token"); 

export const token = writable(storedToken||"")

token.subscribe((value)=>localStorage.setItem("token",value))



let storedUnits = [];
try{
    if(localStorage.getItem("units")){
        storedUnits = JSON.parse(localStorage.getItem("units"));
    }
}
catch(err){}

export const units = writable(storedUnits)

units.subscribe((value)=>localStorage.setItem("units", JSON.stringify(value)))



let storedTasks = [];
try{
    if(localStorage.getItem("tasks")){
        storedTasks = JSON.parse(localStorage.getItem("tasks"))
    }
}
catch(err){}

export const tasks = writable(storedTasks)

tasks.subscribe((value)=>localStorage.setItem("tasks",JSON.stringify(value)))



let storedWorker = false;
try{
    if(localStorage.getItem("worker")){
        storedWorker = JSON.parse(localStorage.getItem("worker"))
    }
}
catch(err){}

export const worker = writable(storedWorker)

worker.subscribe((value)=>localStorage.setItem("worker",JSON.parse(value)))



let storedTokenExpired = false;
try{
    if(localStorage.getItem("tokenExpired")){
        storedTokenExpired = JSON.parse(localStorage.getItem("tokenExpired"))
    }
}
catch(err){}

export const tokenExpired = writable(storedTokenExpired)

tokenExpired.subscribe((value)=>localStorage.setItem("tokenExpired",JSON.stringify(value)))


let storedWorkRels = [];
try{
    if(localStorage.getItem("workRel")){
        storedWorkRels = JSON.parse(localStorage.getItem("workRel"));
    }
}
catch(err){}

export const workRel = writable(storedWorkRels)

workRel.subscribe((value)=>localStorage.setItem("workRel", JSON.stringify(value)))