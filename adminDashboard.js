let events = []


document.addEventListener("DOMContentLoaded",(e)=>{
    events = JSON.parse(window.localStorage.getItem("events")) || []
    renderTable()
    const eventForm = document.getElementById("eventForm")
    eventForm.addEventListener("submit",handleEventForm)
})


window.deleteEvent = function(id)
{
    const eventIdx = events.findIndex(item => item.id === id)
    if(eventIdx !== -1)
    {
        events.splice(eventIdx,1)
        localStorage.setItem("events",JSON.stringify(events))
        renderTable()
    }
}


function renderTable()
{
    const tbody = document.getElementById("eventTable")
    tbody.innerHTML = ""
    let i = 0;
    
    for(let event of events)
    {
        const row = `<tr>
        <td>${i + 1}</td>
        <td>${event.name}</td>
        <td>${event.organizer}</td>
        <td>${event.venue.slice(0,10)}...</td>
        <td>${new Date(event.dateTime).toLocaleString("en-IN")}</td>
        <td>Rs ${event.price}</td>
        <td>${event.maxPeopleAllowed}</td>
        <td style="color:${((event.registeredPeople / event.maxPeopleAllowed) * 100) < 50 ?"red" :"black"}">${((event.registeredPeople / event.maxPeopleAllowed) * 100).toFixed(2)} %</td>
        <td><button class="btn btn-danger" onClick='deleteEvent(${event.id})'">Delete</button></td>
        </tr>`
        tbody.innerHTML += row
        i++
    }

}

function handleEventForm(e)
{
    e.preventDefault()
    const name  = document.getElementById("name").value 
    const organizer = document.getElementById("organizer").value
    const venue = document.getElementById("venue").value
    const dateTime = document.getElementById("dateTime").value
    const price = document.getElementById("price").value
    const maxPeopleAllowed = document.getElementById("maxPeople").value
    const desc = document.getElementById("desc").value
    const newEvent = {
        id:events[events.length-1].id + 1,
        name,
        description:desc,
        organizer,
        price,
        venue,
        maxPeopleAllowed,
        dateTime,
        registeredPeople:0
    }
    events.push(newEvent)
    localStorage.setItem("events",JSON.stringify(events))
    renderTable()
}