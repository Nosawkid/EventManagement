import {events} from './events.js'

document.addEventListener("DOMContentLoaded",(e)=>{
    const eventsFromStorage = JSON.parse(window.localStorage.getItem("events"))
    if(!eventsFromStorage)
    {
        window.localStorage.setItem("events",JSON.stringify(events))
    }
})