let events = []
let userId = ""

document.addEventListener("DOMContentLoaded",(e)=>{
    const params = new URLSearchParams(window.location.search)
    userId = params.get("userId")
    events = JSON.parse(window.localStorage.getItem("events"))
    console.log(events)
    renderEvents()
})



function renderEvents()
{
    const container = document.getElementById("event-container")
    container.innerHTML = ""
    for(let event of events)
    {
        const availableSlots = event.maxPeopleAllowed - event.registeredPeople
        const item = ` <div class="col-md-4 mb-4">
                <div class="card event-card shadow-sm">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Ajl9mSr-r0Myjr6rmaCzWjSqSUf1ye0G2w&s" class="card-img-top" alt="Tech Conference 2025">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <p><strong>Organizer:</strong>${event.organizer}</p>
                        <p><strong>Venue:</strong>${event.venue}</p>
                        <p><strong>Date & Time:</strong> ${new Date(event.dateTime).toLocaleString()}</p>
                        <p><strong>Price:</strong> ₹${event.price}</p>
                        <p><strong>Slots left:</strong> ${availableSlots}</p>
                        <a href="./eventBooking.html?userId=${encodeURIComponent(userId)}&eventId=${encodeURIComponent(event.id)}" class="btn btn-primary" ${availableSlots === 0 && 'disabled'}>Book Now</a>
                    </div>
                </div>
            </div>`

        container.innerHTML += item
    }
}

