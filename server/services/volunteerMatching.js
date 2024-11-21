let volunteers = require('../db/volunteers.js');
let events = require('../db/events.js');

async function matchVolunteerToEvents(volunteerID, events) {
    // // Call a fetch call to get the current volunteers in the database
    // const response = await fetch('http://localhost:3000/volunteers_match');
    // if (!response.ok) {
    //     throw new Error(`Failed to fetch volunteers: ${response.statusText}`);
    // }

    // let volunteers = await response.json();

    let matchingEvents = [];
    const volunteer = volunteers.find(v => v.id === volunteerID.id);
    events.forEach(event => {
        console.log(volunteer)
        let isAvailable = volunteer.availability.includes(event.eventDate);

        let hasSkillMatch = volunteer.skills.some(skill => event.requiredSkills.includes(skill));

        let eventCity = event.location.split(",")[0].trim(); 
        let isCityMatch = volunteer.city.trim() === eventCity.trim();

        if (isAvailable && hasSkillMatch && isCityMatch) {
            matchingEvents.push(event);
        }
    });

    return {
        volunteerName: volunteer.name,
        matchingEvents: matchingEvents
    };
}

module.exports = matchVolunteerToEvents;