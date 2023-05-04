import {writable} from "svelte/store"

//export const tasks = writable([]);
//export const units = writable([]);
//export const token = writable("");


export const dateYear = writable("")
export const dateHour = writable("")

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

worker.subscribe((value)=>localStorage.setItem("worker",JSON.stringify(value)))