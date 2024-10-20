let volunteers = require('../db/volunteers.js');
let events = require('../db/events.js');

function matchVolunteerToEvents(volunteerID, events) {
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