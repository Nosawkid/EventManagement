import { users } from './users.js'
let userId = ""
let eventId = ""
const events = JSON.parse(window.localStorage.getItem("events")) || []
const numTicketInput = document.getElementById("numTickets")
let slots = 0
let event = {}



document.addEventListener("DOMContentLoaded", (e) => {
    const params = new URLSearchParams(window.location.search)
    userId = params.get("userId")
    eventId = params.get("eventId")
    const user = users.find(el => el.id === userId)
    event = events.find(el => el.id === Number(eventId))
    if(event)
    {
        slots = event.maxPeopleAllowed - event.registeredPeople
    }
    renderEventDetails(event)
    const confirmForm = document.getElementById("confirmForm")
    confirmForm.addEventListener("submit",confirmBooking)
})


function renderEventDetails(event) {
    document.getElementById("eventName").textContent = event.name
    document.getElementById("eventOrganizer").textContent = event.organizer
    document.getElementById("eventVenue").textContent = event.venue
    document.getElementById("eventDateTime").textContent = new Date(event.dateTime).toLocaleString()
    document.getElementById("eventPrice").textContent = event.price
    document.getElementById("eventSlots").textContent = event.maxPeopleAllowed - event.registeredPeople

}

numTicketInput.addEventListener("input", (e) => {
    const val = Number(numTicketInput.value)
    const attendeeContainer = document.getElementById("attendee-container")
    attendeeContainer.innerHTML = ""
    if (!val <= 0) {
        if(val < slots)
        {
            for (let i = 1; i <= val; i++) {
                const row = `<div class="mb-1">
                <label class="form-label">Attendee Details</label>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <input required type="text" class="form-control attendee-name" placeholder="Full Name">
                    </div>
                    <div class="col-md-6 mb-2">
                        <input required type="number" class="form-control attendee-age" placeholder="Age" min="1">
                    </div>
                </div>
            </div>`;

                            attendeeContainer.innerHTML += row
            }
            document.getElementById("price").textContent = "₹ "+ event.price * val 
        }else{
            attendeeContainer.innerHTML = `<p class="fw-bold text-danger">Slot Exceeded</p>`
        }
    } else {
        document.getElementById("price").textContent = "₹ "+ 0

    }
})




function confirmBooking(e) {
    e.preventDefault();
    const attendees = [];
    const attendeeRows = document.querySelectorAll("#attendee-container .row");
    const event = events.find(el => el.id === Number(eventId));
    console.log(event)

    if (!event) {
        console.error("Event not found!");
        return;
    }

    let totalPrice = 0; // Initialize price counter

    attendeeRows.forEach(row => {
        const nameInput = row.querySelector(".attendee-name");  
        const ageInput = row.querySelector(".attendee-age");    

        if (nameInput && ageInput) {
            const name = nameInput.value.trim();
            const age = Number(ageInput.value.trim());

            if (name && age) {
                attendees.push({ name, age });
                totalPrice += Number(event.price); // Accumulate total price
            }
        }
    });

    event.registeredPeople += attendees.length; // Update only by actual attendees

  

    window.localStorage.setItem("events", JSON.stringify(events));
    window.localStorage.setItem("booking", JSON.stringify(attendees));
    window.location.href = `./payment.html?price=${encodeURIComponent(Number(totalPrice))}&eventId=${encodeURIComponent(eventId)}`;
}

